import  { useState, useEffect, useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito'
import { Image } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { Factura } from './Factura';

export const CarritoPedido = () => {
  const { carrito, eliminarProducto, actualizarCantidad } = useContext(CarritoContext);

  const handleDecrement = producto => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.id, producto.cantidad - 1);
    } else {
      eliminarProducto(producto.id);
    }
  };

  const handleIncrement = producto => {
    if (producto.cantidad < 10) {
      actualizarCantidad(producto.id, producto.cantidad + 1);
    } else {
      toast.warn('Estás haciendo un pedido más allá del límite recomendado que es 10.');
    }
  };

  const handleChangeCantidad = (e, producto) => {
    const value = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      actualizarCantidad(producto.id, value);
    }
  };

  const formatearPrecio = precio => {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="w-full sm:px-16 mt-4">
      {carrito.map((pedido) => (
        <div key={pedido.id} className="flex flex-col sm:flex-row items-center mb-6 p-4 border border-gray-300 shadow-md">
          <button
            className="w-6 h-6 bg-black text-white hover:bg-red-600 mr-72 flex items-center justify-center mb-2 sm:mb-auto sm:mr-3"
            onClick={() => eliminarProducto(pedido.id)}
          >
            x
          </button>
          <div className="mb-4 sm:mb-0">
            <Image src={pedido.imagen} width={150} height={150} className="rounded-none" />
          </div>
          <div className="flex-grow text-center sm:text-left sm:ml-10">
            <p className="text-2xl text-gray-700 font-semibold mb-1">{pedido.nombre}</p>
            <p className="text-lg text-gray-800 my-1">${formatearPrecio(pedido.precio)},00</p>
            <p className="text-lg text-gray-600 my-1">{pedido.talla}</p>
            <div className="flex items-center justify-center sm:justify-start my-3">
              <button
                className="w-7 h-8 bg-black text-white hover:bg-gray-400 font-semibold"
                onClick={() => handleDecrement(pedido)}
              >
                -
              </button>
              <input
                type="number"
                value={pedido.cantidad}
                className="w-12 h-8 bg-black  text-end text-white"
                onChange={(e) => handleChangeCantidad(e, pedido)}
                readOnly

              />
              <button
                className="w-8 h-8 bg-black text-white hover:bg-gray-400 font-semibold"
                onClick={() => handleIncrement(pedido)}
              >
                +
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-800">Total: ${formatearPrecio(pedido.precio * pedido.cantidad)},00</p>
          </div>
        </div>
      ))}
      <Factura />
    </div>
  );
};
