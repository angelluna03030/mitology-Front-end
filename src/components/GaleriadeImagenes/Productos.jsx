import React from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { Image } from '@nextui-org/react';

const RUTA_API = import.meta.env.VITE_API_URL;
export const Productos = ({ alt, src }) => {
  return (
    <div>
      <Image
      isBlurred
      isZoomed
        className='rounded-md sm:p-3 sm:rounded-2xl'
        src={`${src}`}
        alt={alt}
        onError={e => {
          e.target.src = imagen_No_funtion;
        }}
      />
    </div>
  );
};
