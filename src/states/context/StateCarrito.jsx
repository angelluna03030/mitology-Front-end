import React, { useState, useEffect } from 'react';
import { CarritoContext } from './ContextCarrito';

const StateCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const savedCarrito = localStorage.getItem('carrito');
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto, cantidadSeleccionada) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(
        item => item.id === producto.id,
      );
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadSeleccionada }
            : item,
        );
      } else {
        return [
          ...prevCarrito,
          { ...producto, cantidad: cantidadSeleccionada },
        ];
      }
    });
  };

  const eliminarProducto = productoId => {
    setCarrito(prevCarrito =>
      prevCarrito.filter(item => item.id !== productoId),
    );
  };

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, cantidad: cantidad } : item,
      ),
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0,
    );
  };
  const cambiarTalla = (productoId, nuevaTalla) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, talla: nuevaTalla } : item,
      ),
    );
  };

  const cambiarColor = (productoId, nuevoColor) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, color: nuevoColor } : item,
      ),
    );
  };
  const contarProductos = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito,
        calcularTotal,
        contarProductos,
        cambiarTalla,
        cambiarColor, 
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default StateCarrito;
