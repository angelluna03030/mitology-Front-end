import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../styles/css/carrusel.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Carrusel = ({ imagenes }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={imagenes.length > 1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {imagenes.map(imagen => (
          <SwiperSlide key={imagen.key}>
            <img
              src={`http://localhost:3002/publico/${imagen.imagen}`}
              alt={imagen.nombre_producto}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carrusel;
