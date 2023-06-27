import { useContext } from "react";
import { tiendaContext } from "../../context/tiendaContext";
import "../../css/carrito.css";
import { TfiTrash } from "react-icons/tfi";

export const Carrito = () => {
  const { carrito, eliminarProducto } = useContext(tiendaContext);

  return (
    <div className="carrito-container">
      <div className="detalleproducto">
        {carrito.map((producto) => (
          <div key={producto.id} className="container-producto">
            <div className="container-logo">
              <img
                className="logo"
                src={`http://127.0.0.1:8000${producto.logo}`}
                alt={producto.nombre}
              />
            </div>
            <div className="container-detalle">
              <p className="nombre-prd">{producto.nombre}</p>
              <p>Precio: {producto.precio}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <button onClick={() => eliminarProducto(producto)}>
                <span className="trash-icon">
                  <TfiTrash />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
