import { useState } from "react";
import { tiendaContext } from "./tiendaContext";

export const EstadoCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const sumarproducto = (producto) => {
    // Verificar si el producto ya está en el carrito con el mismo tamaño
    const productoExistente = carrito.find(
      (p) => p.id === producto.id && p.talle === producto.talle
    );

    if (productoExistente) {
      // Verificar si se alcanzó el límite de 3 productos iguales con el mismo tamaño
      if (productoExistente.cantidad < 3) {
        // Actualizar la cantidad del producto existente
        const nuevoCarrito = carrito.map((p) => {
          if (p.id === productoExistente.id && p.talle === productoExistente.talle) {
            return {
              ...p,
              cantidad: p.cantidad + 1
            };
          }
          return p;
        });

        setCarrito(nuevoCarrito);
      } else {
        console.log("Se ha alcanzado el límite de 3 productos iguales con el mismo tamaño");
      }
    } else {
      // Agregar el nuevo producto al carrito con una cantidad inicial de 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };
  const eliminarProducto = (producto) => {
    const nuevoCarrito = carrito.map((p) => {
      if (p.id === producto.id && p.talle === producto.talle) {
        if (p.cantidad > 1) {
          // Si la cantidad es mayor a 1, reducir la cantidad en uno
          return {
            ...p,
            cantidad: p.cantidad - 1
          };
        } else {
          // Si la cantidad es igual a 1, eliminar el producto del carrito
          return null;
        }
      }
      return p;
    }).filter(Boolean); // Eliminar elementos nulos del carrito

    setCarrito(nuevoCarrito);
  };

  return (
    <tiendaContext.Provider value={{ carrito, sumarproducto, eliminarProducto }}>
      {children}
    </tiendaContext.Provider>
  );
};
