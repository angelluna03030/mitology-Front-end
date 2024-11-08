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
export const Categorias = () => {
  const [categories, setCategorias] = useState([]);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const refreshCategorias = async () => {
    try {
      const { status, dataResponse } = await getData(
        `${RUTA_API}/api/categorias`,
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
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
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
        {categories.length > 0 ? (
          categories.map(category => (
            <SwiperSlide key={category._id}>
              <Link to={`/categoria/${category.nombre}`}>
                <div className='w-28 h-56 flex  flex-col items-center font-medium justify-between '>
                  <div className='w-full h-44'>
                    <img
                      onError={e => {
                        e.target.src = imagen_No_funtion;
                      }}
                      src={`${category.imagen}`}
                      alt={category.nombre}
                      className='rounded-2xl w-full h-full object-cover sm:w-32 sm:h-44 '
                    />
                  </div>
                  <span className='text-gray-800 text-sm mb-0 '>
                    {category.nombre}
                  </span>
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
