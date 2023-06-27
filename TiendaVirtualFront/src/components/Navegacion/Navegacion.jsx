import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getCategoriaSubcategoria } from "../../api/Api.Productos";
import { tiendaContext } from "../../context/tiendaContext";
import { Carrito } from "../Carrito/Carrito";
import { FaShoppingCart } from 'react-icons/fa';

import "../../css/Nav.css";

export function Navegacion() {
  const [categorias, setCategorias] = useState([]);
  const { carrito } = useContext(tiendaContext);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    setCantidadCarrito(carrito.length);
  }, [carrito]);

  useEffect(() => {
    async function cargarCategorias() {
      const respuesta = await getCategoriaSubcategoria();
      setCategorias(respuesta.data);
    }
    cargarCategorias();
  }, []);

  const renderSubsubcategorias = (subsubcategorias) => {
    
    return subsubcategorias.map((subsubcategoria) => (
      <li key={subsubcategoria.id}>
        
        <Link
          to={`/paginaproductos/${subsubcategoria.id}/subsubcategoria?id=${subsubcategoria.id}`}
        >
          {subsubcategoria.nombre.split(" ")[0]}
        </Link>
      </li>
    ));
  };

  const renderSubcategorias = (subcategorias) => {
    return subcategorias.map((subcategoria) => (
      <li key={subcategoria.id}>
        <Link
          to={`/paginaproductos/${subcategoria.id}/subcategoria?id=${subcategoria.id}`}
        >
         {subcategoria.nombre.split(" ")[0]}
        </Link>
        {subcategoria.subsubcategorias && (
          <ul className="subsubcategorias">
            {renderSubsubcategorias(subcategoria.subsubcategorias)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="navegacion">
      <header className="header">
        <Link to="/home">HOME</Link>
      </header>
      <ul className="categorias">
        {categorias.map((categoria, index) => (
          <li key={categoria.id} className="categoria">
            <Link
              to={`/paginaproductos/${categoria.id}/categoria?id=${categoria.id}`}
            >
              {categoria.nombre}
            </Link>
            {categoria.subcategorias && (
              <div className="subcategorias">
                <ul>{renderSubcategorias(categoria.subcategorias)}</ul>
              </div>
            )}
            {index < categorias.length  && <span className="barra">/</span>}
          </li>
        ))}
      </ul>
      <div className="carrito-container">
      <Link to="/paginacarrito">
        <FaShoppingCart  className="carrito-icon" />
      ({cantidadCarrito})
      </Link>
      <Carrito/>
    </div>
    </div>
  );
}

