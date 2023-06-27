import { useState, useContext } from "react";
import { tiendaContext } from "../../context/tiendaContext";
import { useNavigate } from "react-router-dom";
import "../../css/vistaprd.css";

export function VistaPrd({ produc }) {
  const [selectedSize, setSelectedSize] = useState("");
  const { sumarproducto } = useContext(tiendaContext);
  const navigate = useNavigate();

  const handleSizeSelect = (talla) => {
    setSelectedSize(talla.id);
  };

  const handleBuyClick = () => {
    if (!selectedSize) {
      alert("Por favor, selecciona un tamaño antes de agregar el producto.");
      return;
    }

    const productoConTalle = {
      id: produc.id,
      nombre: produc.nombre,
      logo: produc.logo,
      precio: produc.precio,
      talle: selectedSize,
    };

    const confirmation = window.confirm("¿Deseas continuar?");

    if (confirmation) {
      // Redirigir a la página de continuar comprando (por ejemplo, "/home")
      navigate("/home");
    } else {
      // Redirigir a la página del carrito de compras (por ejemplo, "/carrito")
      navigate("/paginacarrito");
    }

    sumarproducto(productoConTalle);
  };

  return (
    <>
      <div className="vistaprd-container">
        <div className="vista-producto">
          <div className="logo-section">
            <img
              className="logo"
              src={`http://127.0.0.1:8000${produc.logo}`}
              alt={produc.nombre}
            />
          </div>
          <div className="info-section">
            <h1>{produc.nombre}</h1>
            <p>{produc.precio}</p>
            <hr />
            <div className="sizes-section">
              <h2>Talles:</h2>
              <ul>
                {produc.tallas.map((talla) => (
                  <li
                    key={talla.id}
                    className={selectedSize === talla.id ? "selected" : ""}
                    onClick={() => handleSizeSelect(talla)}
                  >
                    {talla.nombre}
                  </li>
                ))}
              </ul>
            </div>
            <button className="buy-button" onClick={handleBuyClick}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
