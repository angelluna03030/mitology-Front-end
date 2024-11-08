import { IconsConfirmar } from './index';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { Colores } from '../../Productos.modulo/components/DataColores';

export const BotonHacerPedido = () => {
  const { carrito, vaciarCarrito, calcularTotal } = useContext(CarritoContext);

  // Función para obtener el nombre del color basado en el valor hexadecimal
  const obtenerNombreColor = colorHex => {
    const colorEncontrado = Colores.find(c => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };

  const transformarCarrito = carrito => {
    return carrito.map(item => ({
      nombre_producto: item.nombre,
      talla: item.talla,
      color: obtenerNombreColor(item.color), // Usa el nombre en lugar del valor hexadecimal
      precio: item.precio,
      cantidad: item.cantidad,
    }));
  };

  const detalle_venta = transformarCarrito(carrito);
  const total = calcularTotal();

  // Construcción del mensaje
  const generarMensaje = () => {
    let mensaje =
      'Quiero hacer este pedido en Deluxe Uniformes: ========================\n';

    detalle_venta.forEach(item => {
      mensaje += `- ${item.cantidad} *${item.nombre_producto}* - Talla: ${item.talla}, Color: ${item.color}, / _$ ${item.precio.toLocaleString()}_\n`;
    });

    mensaje += `========================\nTOTAL: *$ ${total.toLocaleString()}*\n========================\n`;

    return mensaje;
  };

  const enviarMensaje = () => {
    if (carrito.length === 0) {
      toast.warn('Primero debes agregar productos al carrito.');
      return;
    }

    const numero = '3017996301';
    const mensaje = encodeURIComponent(generarMensaje());
    const urlWhatsApp = `https://wa.me/57${numero}?text=${mensaje}`;

    window.open(urlWhatsApp, '_blank');
    vaciarCarrito();
  };

  return (
    <div className='flex justify-around items-center py-3'>
      <div className='flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer'>
        <IconsConfirmar />
        <button
          className='font-semibold text-sm text-green-700'
          onClick={enviarMensaje}
        >
          Hacer Pedido
        </button>
      </div>
    </div>
  );
};
