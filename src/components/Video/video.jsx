import React, { useState, useEffect } from 'react'; 
import { Skeleton } from '@nextui-org/react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Importa los estilos de Swiper

const RUTA_API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY; 

export const VideoPlayer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerCatalogo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${RUTA_API}/api/productos/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProductos(data);
          } else {
            toast.error('No se encontraron productos');
          }
        } else {
          toast.error('Error al obtener los productos');
        }
      } catch (err) {
        toast.error('No se ha podido traer los productos');
        console.error('Error al traer los productos:', err);
      } finally {
        setLoading(false);
      }
    };

    obtenerCatalogo();
  }, []);

  if (loading) {
    return (
      <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
        <Skeleton className='rounded-lg h-96 w-80 m-auto mb-10' />
      </div>
    );
  }

  if (!productos.length) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <div className='container w-full p-4 lg:min-h-screen flex items-center justify-center mx-auto'>

      <Swiper
      
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }}
        pagination={{ clickable: true }}
      >
        {productos.map((producto) => (
          <SwiperSlide key={producto._id} >
            <Link to={`/producto/${producto._id}`}>
            <div className='max-w-xs sm:max-w-sm w-full mx-auto shadow-md rounded-lg cursor-pointer'>

                <img
                  onError={(e) => {
                    e.target.src = imagen_No_funtion;
                  }}
                  src={
                    producto.imagenes[0]
                      ? `${producto.imagenes[0]}`
                      : imagen_No_funtion
                  }
                  alt={producto.nombreproductos}
                  className='w-full h-auto object-cover rounded-lg'
                />
                <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
                  <h1 className='text-lg sm:text-2xl font-semibold'>
                    {producto.nombreproductos}
                  </h1>
                  <p className='mt-1 sm:mt-2'>
                    {producto.descripcion || 'Descripción no disponible.'}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
