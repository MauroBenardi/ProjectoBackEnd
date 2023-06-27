/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getProductosPorCategoria } from "../../api/Api.Productos";
import { ProductoCard } from "./ProductoCard";
import "../../css/producard.css";
//Hacer una funcion que reciba dos parametros, dependiendo del nombre

export function ProductAll({id, clasificacion}) {

  const [productos, setProducto] = useState([]);
  useEffect(() => {
    async function cargarproductos() {
      const respuesta = await getProductosPorCategoria(id, clasificacion);
      setProducto(respuesta.data);
    }
    cargarproductos();
  }, [id, clasificacion]);
  console.log(productos,"productall")
  return (
      <div className="producto-container">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} produc={producto} /> 
    
        ))}
      </div>

  );

}
