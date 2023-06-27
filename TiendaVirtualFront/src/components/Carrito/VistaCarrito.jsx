import {useContext} from 'react';
import {tiendaContext} from '../../context/tiendaContext';


export const VistaCarrito = () => {
    const {carrito} = useContext(tiendaContext)
    return (
      <div>
        {carrito.map((producto) => (
          <p className='detalle' key={producto.id}>
          <img
              className="logo"
              src={`http://127.0.0.1:8000${producto.logo}`}
              alt={producto.nombre}
            />,  Nombre: {producto.nombre}, Precio: {producto.precio}, Talle: {producto.talla}, Cantidad: {producto.cantidad}
          </p>
        ))}
      </div>
    );
  };
  