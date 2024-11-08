import React, { useContext } from 'react';
import { IconEliminar } from './index';
import { CarritoContext } from '../../../states/context/ContextCarrito';

export const BotonEliminarPedido = () => {
  const { vaciarCarrito } = useContext(CarritoContext);

  return (
    <div className='flex justify-around items-center py-3'>
      <div className='flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer'>
        <IconEliminar />
        <button
          className='font-semibold text-sm text-red-700'
          onClick={vaciarCarrito}
        >
          Eliminar Pedidos
        </button>
      </div>
    </div>
  );
};
