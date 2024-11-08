import { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { toast } from 'react-toastify';
const RUTA_API = import.meta.env.VITE_API_URL;

export const TablaInformacionProductoPedido = () => {
  const { carrito, eliminarProducto, actualizarCantidad } =
    useContext(CarritoContext);

  // Manejadores para incrementar, decrementar y cambiar cantidad
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
      toast.warn(
        'Estás haciendo un pedido más allá del límite recomendado que es 10.',
      );
    }
  };

  const handleChangeCantidad = (e, producto) => {
    const value = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      actualizarCantidad(producto.id, value);
    }
  };

  return (
    <div className='p-24 flex flex-wrap items-center justify-center'>
      {carrito.map(item => (
        <div
          key={item.id}
          className={`flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg`}
          style={{ backgroundColor: item.color }}
        >
          <svg
            className='absolute bottom-0 left-0 mb-8'
            viewBox='0 0 375 283'
            fill='none'
            style={{ transform: 'scale(1.5)', opacity: 0.1 }}
          >
            <rect
              x='159.52'
              y='175'
              width='152'
              height='152'
              rx='8'
              transform='rotate(-45 159.52 175)'
              fill='black'
            />
            <rect
              y='107.48'
              width='152'
              height='152'
              rx='8'
              transform='rotate(-45 0 107.48)'
              fill='black'
            />
          </svg>
          <div className='relative pt-10 px-10 flex items-center justify-center'>
            <div
              className='block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3'
              style={{
                background: 'radial-gradient(black, transparent 60%)',
                transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                opacity: 0.2,
              }}
            ></div>
            <img
              className='relative w-32'
              src={item.imagen}
              alt='Producto'
            />
          </div>
          <div className='relative text-white px-6 pb-6 mt-6'>
            <span className='block opacity-75 -mb-1'>{item.nombre}</span>
            <div className='flex justify-between items-center'>
              <span className='block font-semibold text-xl'>{item.talla}</span>
              <span className=' bg-white rounded-full text-black text-xs font-bold px-3 py-2 leading-none flex items-center'>
                ${item.precio}
              </span>
            </div>
            <div className='number-control flex items-center  justify-center mt-2'>
              <div
                className='number-left flex items-center justify-center w-8 h-8 bg-white border-1 border-gray-300  rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gray-200 text-black'
                onClick={() => handleDecrement(item)}
              >
                -
              </div>
              <input
                type='number'
                name='number'
                className='number-quantity mx-2 text-center w-12 p-1 border-1 border-gray-300  rounded-md text-black'
                value={item.cantidad}
                onChange={e => handleChangeCantidad(e, item)}
                min='1'
                max='10'
              />
              <div
                className=' number-right flex items-center justify-center w-8 h-8 bg-white border-1 border-gray-300  rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gray-200 text-black'
                onClick={() => handleIncrement(item)}
              >
                +
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
