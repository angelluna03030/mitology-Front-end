import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { Titulo } from '../../components/Titulo';
import { Descripcion } from '../../components/Descripcion';
import { Comprar } from '../../components/Boton';
import { GaleriaProductos } from '../../components/GaleriaProducto';
import { Color } from '../../components/Color';
import { CarritoComprasIcono } from '../CarritoComprar/FormularioDeUsuario';
import { toast } from 'react-toastify';
import { getData } from '../../config/utils/metodoFecht';
import { CargarProductos } from '../../components/CardCargando/CargarProductos/CargarProductos';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { Tooltip, Button } from '@nextui-org/react';
import { Escritorio } from './Escritorio';
const RUTA_API = import.meta.env.VITE_API_URL;
import { useMediaQuery } from 'react-responsive';
import {IconWhastApp} from "../../components/WhatsApp"

export const Producto = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 1224 });
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedImagen, setSelectedImagen] = useState(null); // Estado para la imagen seleccionada
  const [loading, setLoading] = useState(true);
  const { agregarProducto } = useContext(CarritoContext);
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');
const detalleProducto = {
  nombreproductos: "camsiaseta",
  imagenes: [
     "https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206",
     "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"
  ],
  precio: 40000,
  tallas: ["XL", "XX"],
  colores: ["#000000", "#701717FF", "#190606FF", "#31C857FF", "#b1b1b1"],


}
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
        <Layout />
        <Buscador />
        {isMobile && (
          <>
            <CargarProductos />
          </>
        )}
        <Footer />
      </>
    );
  }

  return (
    <>
      <Layout />
      {isDesktopOrLaptop && (
        <Escritorio producto={detalleProducto} setProducto={setProducto} />
      )}
      {isMobile && (
        <>
          {detalleProducto && (
            <>
              <GaleriaProductos
                imagenes={detalleProducto.imagenes.map(img => ({
                  src: `${img}`,
                  alt: `Imagen de producto ${img}`,
                }))}
              />
              <div style={{ display: 'flex' }} className='ml-6'>
                <Titulo
                  titulo={detalleProducto.nombreproductos}
                  precio={detalleProducto.precio}
                />
              </div>
              <br />
              <Descripcion descripcion={detalleProducto.descripcion} />
              <br />
              <p className='text-lg ml-4'>Tallas</p>
              <br />
              <div className='space-y-4'>
                <div className='grid grid-cols-6 gap-4'>
                  {detalleProducto.tallas.map(size => (
                    <div key={size} className='flex items-center space-x-2'>
                      <input
                        className='day-btn m-9'
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
                <div>
                  <p className='text-lg ml-4'>Colores</p>
                </div>
                <div className='grid grid-cols-6 gap-4 ml-2'>
                  {detalleProducto.colores.map(color => (
                    <Color
                      key={color}
                      color={color}
                      isSelected={selectedColor === color}
                      onSelect={handleSelectColor}
                    />
                  ))}
                </div>
              </div>
              <div className='mt-4 flex ml-6'>
                <div className='bg-white border border-sky-950 rounded-full m-3 p-4'>
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
                      content: [
                        'py-2 px-4 shadow-xl bg-[#358FED]',
                        'text-white ',
                      ],
                    }}
                  >
                    <button
                      type='button'
                      onClick={handleAgregarProducto}
                      className={` font-semibold  rounded-full ${validar ? 'text-black' : 'text-gray-400'}`}
                    >
                      Agregar Al Carrito
                    </button>
                  </Tooltip>
                </div>
                <Comprar
                  color={selectedTalla}
                  nombre={detalleProducto.nombreproductos}
                  precio={detalleProducto.precio}
                  producto={detalleProducto}
                  selectedColor={selectedColor}
                  selectedTalla={selectedTalla}
                />
                <CarritoComprasIcono />
              </div>
            </>
          )}
        </>
      )}
      <IconWhastApp></IconWhastApp>

      <Footer />
    </>
  );
};
