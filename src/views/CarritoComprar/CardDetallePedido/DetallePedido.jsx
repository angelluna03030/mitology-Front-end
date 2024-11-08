import { BotonHacerPedido } from './index';
import { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { BotonEliminarPedido } from './BottonElinimarPedido';
export const DetallePedidos = () => {
  const { calcularTotal } = useContext(CarritoContext);
  const { contarProductos } = useContext(CarritoContext);

  const total = calcularTotal();
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };
  const fechaActual = obtenerFechaActual();
  const cantidad = contarProductos();
  return (
    <>
      <div className='flex flex-col bg-white w-80 h-60 rounded-md py-4 px-6 border-gray-300 mb-32 m-auto border-1 '>
        <h3 className='text-center font-bold text-xl text-gray-800 pb-2'>
          ${total > 0 ? total : 0}
        </h3>
        <h3 className='text-base font-semibold text-gray-900'>
          Cantidad Productos: {cantidad > 0 ? cantidad : 0}
        </h3>

        <div className='flex gap-2 text-sm text-gray-500 border-b pb-2'>
          <p className=''>Dia del pedido:</p>
          <p>{fechaActual}</p>
        </div>
        <BotonHacerPedido />
        <BotonEliminarPedido />
      </div>
    </>
  );
};
