import { Tooltip, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Colores } from '../../views/Productos.modulo/components/DataColores';
export const Comprar = ({
  nombre,
  precio,
  producto,
  selectedColor,
  selectedTalla,
}) => {
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');

  const obtenerNombreColor = colorHex => {
    const colorEncontrado = Colores.find(c => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };
  const handleComprarProducto = () => {
    if (validar && nombre && precio && selectedColor && selectedTalla) {
      console.log(nombre, precio, producto, selectedColor, selectedTalla);
      enviarMensaje(); // Llama a la función para enviar el mensaje
    } else {
      toast.error(mensajeTooltip); // Muestra el mensaje del tooltip como un error si la validación falla
    }
  };

  const generarMensaje = () => {
    let mensaje =
      'Quiero hacer este pedido en Deluxe Uniformes: ========================\n';

    mensaje += `- 1 *${nombre}* - Talla: ${selectedTalla}, Color: ${obtenerNombreColor(selectedColor)}, / _$ ${precio.toLocaleString()}_\n`;

    mensaje += `========================\nTOTAL: *$ ${precio.toLocaleString()}*\n========================\n`;

    return mensaje;
  };
  const enviarMensaje = () => {
    const numero = '3017996301';
    const mensaje = encodeURIComponent(generarMensaje());
    const urlWhatsApp = `https://wa.me/57${numero}?text=${mensaje}`;

    console.log(urlWhatsApp); // Agrega esto para verificar la URL generada

    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');
  };

  useEffect(() => {
    if (
      producto &&
      (producto.colores.length === 0 || producto.tallas.length === 0)
    ) {
      setMensajeTooltip('Este producto no tiene opciones de talla ni color.');
      setValidar(true); // Permite la compra si no hay tallas ni colores
    } else if (!nombre || !precio) {
      setMensajeTooltip('El producto debe tener un nombre y un precio.');
      setValidar(false);
    } else if (!selectedColor && producto.colores.length > 0) {
      setMensajeTooltip('Elige Color para continuar con tu compra.');
      setValidar(false);
    } else if (!selectedTalla && producto.tallas.length > 0) {
      setMensajeTooltip('Elige Talla para continuar con tu compra.');
      setValidar(false);
    } else {
      setMensajeTooltip('');
      setValidar(true);
    }
  }, [selectedColor, selectedTalla, producto, nombre, precio]);

  return (
    <Tooltip
      isDisabled={validar}
      content={mensajeTooltip}
      showArrow
      placement='top-start'
      classNames={{
        base: [
          // arrow color
          'before:bg-neutral-400 dark:before:bg-white',
        ],
        content: ['py-2 px-4 shadow-xl bg-[#358FED]', 'text-white'],
      }}
    >
      <div className='bg-colorprimary rounded-full m-3 p-4 text-white w-40 justify-items-center text-center'>
        <button
          type='button'
          onClick={handleComprarProducto}
          className='  sm:mt-0'
        >
          Comprar
        </button>
      </div>
    </Tooltip>
  );
};
