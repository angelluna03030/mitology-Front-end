import { Tooltip, Button, ButtonGroup } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Colores } from '../../views/Productos.modulo/components/DataColores';
import React, { useContext } from 'react';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { useNavigate } from 'react-router-dom';
export const Comprar = ({
  nombre,
  precio,
  producto,
  selectedColor,
  selectedTalla,
}) => {
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');
  const { agregarProducto } = useContext(CarritoContext);
  const navigate = useNavigate();
  const obtenerNombreColor = colorHex => {
    const colorEncontrado = Colores.find(c => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };

  const handleComprarProducto = () => {
    if (validar && nombre && precio && selectedColor && selectedTalla) {
      handleAgregarProducto(); // Llama a la función para agregar el producto al carrito
    } else {
      toast.error(mensajeTooltip); // Muestra el mensaje del tooltip como un error si la validación falla
    }
  };

  const handleAgregarProducto = () => {
    if (validar) {
      agregarProducto(
        {
          id: producto._id,
          imagen: producto.imagenes[0], // Utiliza la primera imagen del producto
          nombre: producto.nombreproductos,
          precio: producto.precio,
          talla: selectedTalla,
          color: selectedColor,
        },
        1 // Cantidad seleccionada
      );
      toast.success('Listo para la compra');
      navigate(`/carritocompras`);
    } else {
      toast.error(mensajeTooltip);
    }
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
        content: ['py-2 px-4 shadow-xl bg-[#000000FF]', 'text-white'],
      }}
    >
      <div className='rounded-full mt-1 p-4 text-white justify-items-center text-center  cursor-pointer '>
        <button
          type='button'
          onClick={handleComprarProducto}
          className='font-semibold w-56 h-16 text-xl bg-black'
        >
          Comprar
        </button>
      </div>
    </Tooltip>
  );
};
