import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Buscador } from '../../components/Inputs';

import { Titulo } from '../../components/Titulo';
import {  DescripcionProducto } from '../../components/Descripcion';
import { Comprar } from '../../components/Boton';
import { GaleriaProductos } from '../../components/GaleriaProducto';
import { Color } from '../../components/Color';
import {   CategoriasProductos } from '../../components/CategoriasProductos';

import { toast } from 'react-toastify';
import { getData } from '../../config/utils/metodoFecht';
import { CargarProductosEscritorio } from '../../components/CardCargando/CargarProductos/CargarProductoEscritorio';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { Tooltip, Button, ButtonGroup } from '@nextui-org/react';
import { IconWhastApp } from "../../components/WhatsApp"
import { Layout } from '../../components/Layout';
import { Footer } from '../../components/Footer';
import { GuiadeTalla } from '../../components/GuiadeTalla/Guiadetalla';

const RUTA_API = import.meta.env.VITE_API_URL;
export const Producto = ({ }) => {
  const { id } = useParams();
  const [ producto, setProducto] =  useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedImagen, setSelectedImagen] = useState(null); // Estado para la imagen seleccionada
  const [loading, setLoading] = useState(true);
  const { agregarProducto } = useContext(CarritoContext);
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');
  const formatearPrecio = (precio) => {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")


  };

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
      setMensajeTooltip('Elige Talla y Color para continuar con tu Pedido.');
      setValidar(false);
    } else if (selectedColor === null && producto.colores.length > 0) {
      setMensajeTooltip('Elige Color para continuar con tu Pedido.');
      setValidar(false);
    } else if (selectedTalla === null && producto.tallas.length > 0) {
      setMensajeTooltip('Elige Talla para continuar con tu Pedido.');
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
    <Layout></Layout>
    <div className='bg-black w-full'>
      
      <Buscador></Buscador>
            </div> 
      {producto && (
     <div className={`flex flex-col lg:flex-row mt-10 `}>
     {/* Parte izquierda: Galería de productos, ocupando toda la anchura en móvil */}
     <div className={`w-full lg:w-1/2 `}>
       <GaleriaProductos
         imagenes={producto.imagenes.map(img => ({
           src: `${img}`,
           alt: `Imagen de producto ${img}`,
         }))}
       />
     </div>
   
     {/* Parte derecha: Información del producto */}
     <div className={`w-full lg:w-1/3 lg:ml-20 mt-4 lg:mt-2`}>
       <Titulo titulo={producto.nombreproductos} />
   
       <div className={`text-xl font-semibold text-left mr-8 my-3 text-[#b1b1b1]`}>
         {producto.categoria}
       </div>
   
       <div className={`text-2xl font-semibold text-left mr-8`}>
         ${formatearPrecio(producto.precio)},00
       </div>
   
       <hr className="my-6 border-blueGray-300" />
   
       <div>
         <p className="text-lg">Colores</p>
         <div className="grid grid-cols-8 mx-2 sm:mx-0 md:grid-cols-8 gap-4 my-3">
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
   
       <p className="text-lg">Tallas</p>
       <div className="space-y-4">
         <div className="grid grid-cols-6 mx-2 sm:mx-0 md:grid-cols-6 gap-4">
           {producto.tallas.map(size => (
             <div key={size} className="flex items-center space-x-2 my-3">
               <input
                 className="day-btn"
                 id={`size-${size.toLowerCase()}`}
                 type="checkbox"
                 checked={selectedTalla === size}
                 onChange={() => handleSelectTalla(size)}
               />
               <label className="day-label" htmlFor={`size-${size.toLowerCase()}`}>
                 {size}
               </label>
             </div>
           ))}
         </div>
       </div>
           <GuiadeTalla></GuiadeTalla>
   

   
       <div className="flex flex-col lg:flex-row">
         <div className="border-sky-950 rounded-full m-1 p-4">
         <div className='  mt-1 sm:mt-0 p-4 sm:p-0 text-white  justify-items-center text-center'>

         <Tooltip
             isDisabled={validar}
             content={mensajeTooltip}
             showArrow
             placement="top-start"
             classNames={{
               base: ['before:bg-neutral-400 dark:before:bg-white'],
               content: ['py-2 px-4 shadow-xl bg-[#000000FF]', 'text-white'],
             }}
           >
             <button
               onClick={handleAgregarProducto}
               className={`font-semibold border-2 w-56   h-16  text-xl border-black ${
                 validar ? 'text-black' : 'text-gray-400'
               }`}
             >
               + Agregar Al Carrito
             </button>
           </Tooltip>
         </div>
         </div>
      
         <Comprar
           color={selectedTalla}
           nombre={producto.nombreproductos}
           precio={producto.precio}
           producto={producto}
           selectedColor={selectedColor}
           selectedTalla={selectedTalla}
         />
   
         <IconWhastApp />
       </div>
       <DescripcionProducto descripcion={producto.descripcion} />
     </div>
     
   </div>
   
      )}
   
      <CategoriasProductos
      categoria={producto.categorias[0]}
      ></CategoriasProductos>
    
      <Footer></Footer>
    </>
  );
}
