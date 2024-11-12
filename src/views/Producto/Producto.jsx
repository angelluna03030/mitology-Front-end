import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

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

const RUTA_API = import.meta.env.VITE_API_URL;
export const Producto = ({ producto, setProducto }) => {
  const { id } = useParams();

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
  const detaleproducto ={
    nombreproductos: "camisiatea",
    imagenes: [
"https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750",
"https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206"
    ],
    tallas:["XL", "L"],
    colores: ["#000000", "#132059FF", "#7B0909FF", "#B50404FF", "#9E0000FF"],
    precio: "40000",
    categoria :"Camisas"
  }
  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true);
  //     try {
  //       const { status, dataResponse } = await getData(
  //         `${RUTA_API}/api/productos/${id}`,
  //       );
  //       if (status >= 200 && status < 300) {
  //         setProducto(dataResponse);
  //         setSelectedImagen(dataResponse.imagenes[0]); // Selecciona la primera imagen
  //       } else {
  //         toast.error('No se encontraron los recursos (404)');
  //       }
  //     } catch (err) {
  //       toast.error('No se ha podido traer el producto');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, [id]);

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

  if (!loading) {
    return (
      <>
        <CargarProductosEscritorio />
      </>
    );
  }

  return (
    <>
    <Layout></Layout>
      {detaleproducto && (
     <div className={`flex flex-col lg:flex-row mt-10 `}>
     {/* Parte izquierda: Galería de productos, ocupando toda la anchura en móvil */}
     <div className={`w-full lg:w-1/2`}>
       <GaleriaProductos
         imagenes={detaleproducto.imagenes.map(img => ({
           src: `${img}`,
           alt: `Imagen de producto ${img}`,
         }))}
       />
     </div>
   
     {/* Parte derecha: Información del producto */}
     <div className={`w-full lg:w-1/3 lg:ml-20 mt-4 lg:mt-2`}>
       <Titulo titulo={detaleproducto.nombreproductos} />
   
       <div className={`text-xl font-semibold text-left mr-8 my-3 text-[#b1b1b1]`}>
         {detaleproducto.categoria}
       </div>
   
       <div className={`text-2xl font-semibold text-left mr-8`}>
         ${formatearPrecio(detaleproducto.precio)},00
       </div>
   
       <hr className="my-6 border-blueGray-300" />
   
       <div>
         <p className="text-lg">Colores</p>
         <div className="grid grid-cols-8 mx-2 sm:mx-0 md:grid-cols-8 gap-4 my-3">
           {detaleproducto.colores.map(color => (
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
           {detaleproducto.tallas.map(size => (
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
   
       <br />
   
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
           nombre={detaleproducto.nombreproductos}
           precio={detaleproducto.precio}
           producto={detaleproducto}
           selectedColor={selectedColor}
           selectedTalla={selectedTalla}
         />
   
         <IconWhastApp />
       </div>
   
       <DescripcionProducto descripcion={detaleproducto.descripcion} />
     </div>
     
   </div>
   
      )}
   
      <CategoriasProductos></CategoriasProductos>
    
      <Footer></Footer>
    </>
  );
}
