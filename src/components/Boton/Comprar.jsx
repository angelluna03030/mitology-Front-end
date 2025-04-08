import { Tooltip } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { Colores } from '../../views/Productos.modulo/components/DataColores';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { FormularioCompra } from "./Formulariodecompra";
import { useDisclosure } from '@nextui-org/react';

export const Comprar = ({ nombre, precio, producto, selectedColor, selectedTalla }) => {
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');
  const { agregarProducto } = useContext(CarritoContext);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal

  const obtenerNombreColor = colorHex => {
    const colorEncontrado = Colores.find(c => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };

  const handleComprarProducto = () => {
    if (validar && nombre && precio && selectedColor && selectedTalla) {
      handleAgregarProducto();
      onOpen(); // Abre el modal
    } else {
      toast.error(mensajeTooltip);
    }
  };

  const handleAgregarProducto = () => {
    if (validar) {
      agregarProducto({
        id: producto._id,
        imagen: producto.imagenes[0],
        nombre: producto.nombreproductos,
        precio: producto.precio,
        talla: selectedTalla,
        color: selectedColor,
      }, 1);
      toast.success('Listo para la compra');
    } else {
      toast.error(mensajeTooltip);
    }
  };

  useEffect(() => {
    if (!nombre || !precio) {
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
    <>
      <Tooltip isDisabled={validar} content={mensajeTooltip} showArrow placement='top-start'>
        <div onClick={handleComprarProducto}  className=' mt-1 p-4 text-white text-center cursor-pointer' >
          <button type='button'  className='font-semibold cursor-pointer w-56 h-16 text-xl bg-black '>
            Comprar
          </button>
        </div>
      </Tooltip>

      {/* Modal de compra */}
      <FormularioCompra isOpen={isOpen} onClose={onClose} />
    </>
  );
};
