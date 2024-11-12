// src/components/Categorias.js
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Asegúrate de importar toast si lo usas
import 'swiper/swiper-bundle.css'; // Importar los estilos de Swiper
import { Skeleton } from '@nextui-org/react';
const RUTA_API = import.meta.env.VITE_API_URL;
import imagen_No_funtion from '../../assets/no-fotos.png';
import { getData } from '../../config/utils/metodoFecht';
import { useMediaQuery } from 'react-responsive';
export const CategoriasProductos = ({categoria}) => {
  const [categories, setCategorias] = useState([]);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  const producto = [
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    
  ]
  const refreshCategorias = async () => {
    try {
      const { status, dataResponse } = await getData(
        `${RUTA_API}/api/productos/categorias/${categoria}`,
      );

      if (status >= 200 && status < 300) {
        // Filtrar los datos según el estado
        const productosFiltrados = dataResponse.filter(
          categoria => categoria.estado !== 0,
        );
        setCategorias(productosFiltrados);
      } else {
        toast.error('No se encontraron los recursos (404)');
      }
    } catch (err) {
      toast.error('No se ha podido traer las categorías');
      console.error(err);
    }
  };

  useEffect(() => {
    refreshCategorias();
  }, []);

  return (
    <div className='my-10 mx-5'>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        className='ml-2 md:ml-0'
        pagination={{ clickable: true }}
      >
        {producto.length > 0 ? (
          producto.map(category => (
            <SwiperSlide key={category._id}>
             <Link to={`/producto/${category._id}`} key={category._id}>
            <div className='w-56 sm:w-56 mx-auto   sm:ml-0 relative shadow-sm hover:shadow-md rounded-lg cursor-pointer h-80 hover:underline sm:mx-8 transition-shadow duration-400'>
              <img
                onError={e => {
                  e.target.src = imagen_No_funtion;
                }}
                src={
                    category.imagenes[0]
                    ? `${category.imagenes[0]}`
                    : imagen_No_funtion
                }
                alt={category.nombreproductos}
                className='w-full h-48 object-cover rounded-t-lg transition-opacity duration-500 hover:opacity-0'
              />
              <img
                onError={e => {
                  e.target.src = imagen_No_funtion;
                }}
                src={
                    category.imagenes[1]
                    ? `${category.imagenes[1]}`
                    : imagen_No_funtion
                }
                alt={category.nombreproductos}
                className='w-full h-48 object-cover rounded-t-lg absolute top-0 left-0 transition-opacity duration-500 opacity-0 hover:opacity-100'
              />
              <div className='h-20 sm:h-20 backdrop-blur text-white p-4 rounded-b-lg'>
                <h1 className='text-lg sm:text-lg items-center justify-center text-center font-semibold text-[#787878]'>
                  {category.nombreproductos}
                </h1>
                <p className='mt-1 sm:mt-2 text-[#B9B9B9] items-center justify-center text-center underline-offset-0'>
                  {category.descripcion + ",00 COP" || 'No hay Precio Disponible.'}
                </p>
              </div>
            </div>


          </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className='flex'>
            <Skeleton className='rounded-lg w-40 h-44  sm:h-50 sm:m-5 ml-5'></Skeleton>
            <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
            <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
            {isDesktopOrLaptop && (
              <>
                <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
                <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
                <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
                <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
                <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
                <Skeleton className='rounded-lg w-40 h-44 sm:h-50 sm:m-5 ml-5'></Skeleton>
              </>
            )}
          </div>
        )}
      </Swiper>
    </div>
  );
};
