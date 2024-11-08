import React from 'react';
import IconoCarritoCompras from '../../../assets/carrito.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';

export const CarritoComprasIcono = () => {
  const { carrito } = useContext(CarritoContext);

  // Contar la cantidad total de productos en el carrito
  const cantidadProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  return (
    <Link to={'/carritocompras'}>
      <div className='z-50 fixed bottom-4 left-4 bg-white rounded-full sm:w-16 sm:h-16 flex items-center justify-center shadow-md hover:bg-white transition duration-300 w-14 h-14 border-x-slate-100 shadow-[#ffffff]'>
        {cantidadProductos > 0 && (
          <div className='bg-stroke-red-700 w-3 h-3 rounded-full fixed bottom-14 left-14 sm:bottom-16 sm:left-16'></div>
        )}
        <img
          src={IconoCarritoCompras}
          alt='Carrito de Compras'
          className='sm:w-8 sm:h-8 w-6 h-6'
        />
      </div>
    </Link>
  );
};
