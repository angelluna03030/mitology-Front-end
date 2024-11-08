import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Titulo } from '../../components/Titulo';
import { Descripcion } from '../../components/Descripcion';
import { Comprar } from '../../components/Boton';
import { GaleriaProductos } from '../../components/GaleriaProducto';
import { Color } from '../../components/Color';
import { CarritoComprasIcono } from '../CarritoComprar/IconoCarritoCompras';
import { toast } from 'react-toastify';
import { getData } from '../../config/utils/metodoFecht';
import { CargarProductosEscritorio } from '../../components/CardCargando/CargarProductos/CargarProductoEscritorio';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { Tooltip, Button } from '@nextui-org/react';
import {IconWhastApp} from "../../components/WhatsApp"

const RUTA_API = import.meta.env.VITE_API_URL;
export const Escritorio = ({ producto, setProducto }) => {
  const { id } = useParams();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedImagen, setSelectedImagen] = useState(null); // Estado para la imagen seleccionada
  const [loading, setLoading] = useState(true);
  const { agregarProducto } = useContext(CarritoContext);
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/productos/${id}`,
        );
        if (status >= 200 && status < 300) {
          setProducto(dataResponse);
          setSelectedImagen(dataResponse.imagenes[0]); // Selecciona la primera imagen
        } else {
          toast.error('No se encontraron los recursos (404)');
        }
      } catch (err) {
        toast.error('No se ha podido traer el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleAgregarProducto = () => {
    if (validar) {
      agregarProducto(
        {
          id: producto._id,
          imagen: producto.imagenes[0], // Utiliza la imagen seleccionada (la primera imagen)
          nombre: producto.nombreproductos,
          precio: producto.precio,
          talla: selectedTalla,
          color: selectedColor,
        },
        1, // Cantidad seleccionada
      );
      toast.success('Producto agregado exitosamente');
    } else {
      toast.error(mensajeTooltip); // Muestra el mensaje del tooltip como un error si la validación falla
    }
  };

  const handleSelectColor = color => {
    setSelectedColor(color);
  };

  const handleSelectTalla = size => {
    setSelectedTalla(size);
  };

  useEffect(() => {
    if (
      producto &&
      (producto.colores.length === 0 || producto.tallas.length === 0)
    ) {
      setMensajeTooltip('Este producto no tiene opciones de talla ni color.');
      setValidar(true); // Permite la compra si no hay tallas ni colores
    } else if (selectedColor === null && selectedTalla === null) {
      setMensajeTooltip('Elige Talla y Color para continuar con tu compra.');
      setValidar(false);
    } else if (selectedColor === null && producto.colores.length > 0) {
      setMensajeTooltip('Elige Color para continuar con tu compra.');
      setValidar(false);
    } else if (selectedTalla === null && producto.tallas.length > 0) {
      setMensajeTooltip('Elige Talla para continuar con tu compra.');
      setValidar(false);
    } else {
      setMensajeTooltip('');
      setValidar(true);
    }
  }, [selectedColor, selectedTalla, producto]);

  if (loading) {
    return (
      <>
        <CargarProductosEscritorio />
      </>
    );
  }

  return (
    <>
      {producto && (
        <div className='flex  mt-10'>
          {/* Parte izquierda: Galería de productos */}
          <div className='w-1/2'>
            <GaleriaProductos
              imagenes={producto.imagenes.map(img => ({
                src: `${img}`,
                alt: `Imagen de producto ${img}`,
              }))}
            />
          </div>

          {/* Parte derecha: Información del producto */}
          <div className='w-1/2 ml-6 mt-10'>
            <Titulo
              titulo={producto.nombreproductos}
              precio={producto.precio}
            />
            <br />
            <br />

            <Descripcion descripcion={producto.descripcion} />
            <br />
            <p className='text-lg'>Tallas</p>
            <br />

            <div className='space-y-4'>
              <div className='grid grid-cols-6 gap-4'>
                {producto.tallas.map(size => (
                  <div key={size} className='flex items-center space-x-2'>
                    <input
                      className='day-btn'
                      id={`size-${size.toLowerCase()}`}
                      type='checkbox'
                      checked={selectedTalla === size}
                      onChange={() => handleSelectTalla(size)}
                    />
                    <label
                      className='day-label'
                      htmlFor={`size-${size.toLowerCase()}`}
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
              <br />

              <div>
                <p className='text-lg'>Colores</p>
              </div>
              <br />

              <div className='grid grid-cols-6 gap-4'>
                {producto.colores.map(color => (
                  <Color
                    key={color}
                    color={color}
                    isSelected={selectedColor === color}
                    onSelect={handleSelectColor}
                  />
                ))}
              </div>
            </div>
            <br />

            <div className='mt-4 flex pl-48'>
              <div className='bg-white border border-sky-950 rounded-full m-3 p-4'>
                <Tooltip
                  isDisabled={validar}
                  content={mensajeTooltip}
                  showArrow
                  placement='top-start'
                  classNames={{
                    base: ['before:bg-neutral-400 dark:before:bg-white'],
                    content: [
                      'py-2 px-4 shadow-xl bg-[#358FED]',
                      'text-white ',
                    ],
                  }}
                >
                  <button
                    type='button'
                    onClick={handleAgregarProducto}
                    className={`font-semibold rounded-full ${validar ? 'text-black' : 'text-gray-400'}`}
                  >
                    Agregar Al Carrito
                  </button>
                </Tooltip>
              </div>
              <Comprar
                color={selectedTalla}
                nombre={producto.nombreproductos}
                precio={producto.precio}
                producto={producto}
                selectedColor={selectedColor}
                selectedTalla={selectedTalla}
              />
              <CarritoComprasIcono />
      <IconWhastApp></IconWhastApp>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
