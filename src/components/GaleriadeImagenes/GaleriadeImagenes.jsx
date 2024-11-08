import React from 'react';
import { Productos } from './index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { EffectCoverflow } from 'swiper/modules';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { Skeleton } from '@nextui-org/react';

export const GaleriaImagenes = ({ imagenes = [] }) => {
  if (!imagenes || imagenes.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
          <Skeleton className='rounded-lg  sm:m-5  h-96 w-80 m-auto mb-10' />;
        </div>
      </div>
    );
  }
  return (
    <div className='flex justify-center items-center md:ml-12 md:mb-12'>
      <Swiper
        modules={[EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true} // Habilitar el bucle para que las imágenes se repitan
        slidesPerView={3} // Mostrar solo 3 diapositivas a la vez
        spaceBetween={30} // Espacio entre las diapositivas
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        className=''
      >
        {imagenes.map((imagen, index) => (
          <SwiperSlide
            key={index}
            className='flex items-center md:ml-2 mb-10 md:mb-16 h-full'
          >
            <Productos
              src={imagen}
              alt={imagen}
              onError={e => {
                e.target.src = imagen_No_funtion;
              }}
              className='rounded-lg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
