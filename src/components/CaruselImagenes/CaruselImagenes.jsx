import { useState, useEffect } from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
const RUTA_API = import.meta.env.VITE_API_URL;
import { Skeleton } from '@nextui-org/react';

export const Carrusel = ({ imagenes = [] }) => {
  const [offset, setOffset] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleAnimation = () => {
      setOffset(prevOffset => (prevOffset >= 100 ? 0 : prevOffset + 0.05)); // Disminuir el incremento
    };

    const intervalId = isPlaying ? setInterval(handleAnimation, 50) : null; // Aumentar el tiempo del intervalo

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  useEffect(() => {
    if (imagenes.length === 0) return;

    let loadedImagesCount = 0;

    const onLoad = () => {
      loadedImagesCount += 1;
      if (loadedImagesCount === imagenes.length) {
        setImagesLoaded(true);
      }
    };

    imagenes.forEach(imagenSrc => {
      const img = new Image();
      img.src = `${imagenSrc}`;
      img.onload = onLoad;
      img.onerror = onLoad; // Manejar errores
    });
  }, [imagenes]);

  if (!imagesLoaded) {
    return (
      <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
        <Skeleton className='rounded-lg sm:m-5 h-96 w-80 m-auto mb-10' />;
      </div>
    );
  }

  const containerStyle = {
    display: 'flex',
    transition: 'transform 0.1s linear',
    transform: `translateX(-${offset}%)`,
    width: `${imagenes.length * 100}%`,
  };

  return (
    <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
      <div className='flex' style={containerStyle}>
        {imagenes.map((imagenSrc, index) => (
          <div
            key={index}
            className='w-full'
            style={{ minWidth: `${100 / imagenes.length}%` }}
          >
            <img
              onError={e => {
                e.target.src = imagen_No_funtion;
              }}
              src={`${imagenSrc}`}
              alt={`Imagen ${index + 1}`}
              className='w-[100%] h-full object-cover'
            />
          </div>
        ))}
      </div>
      {/* <button onClick={() => setIsPlaying(!isPlaying)} className='absolute top-4 right-4 bg-white p-2 rounded'>
        {isPlaying ? 'Pausar' : 'Reanudar'}
      </button> */}
    </div>
  );
};
