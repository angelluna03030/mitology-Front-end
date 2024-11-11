import { useState, useEffect } from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
import izquiera from '../../assets/izquierda.png';
import derecha from '../../assets/derecha.png';
import { Skeleton } from '@nextui-org/react';
import { Buscador } from '../Inputs';
export const Carrusel = ({ imagenes = [] }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const Imagenes = [
    {
      imagen: "https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206"
    },
    {
      imagen: "https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206"
    },
    {
      imagen: "https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206"
    }
  ];

  const totalImages = Imagenes.length;

  useEffect(() => {
    const timeoutId = setTimeout(() => setImagesLoaded(true), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 10000);

    return () => clearInterval(autoSlide);
  }, [totalImages]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  if (!imagesLoaded) {
    return (
      <div className="overflow-hidden rounded-lg shadow-md relative h-full w-full  mt-10 m-auto">
        <Skeleton className="rounded-lg sm:m-5  m-auto mb-10 h-96 w-full " />
      </div>
    );
  }

  const containerStyle = {
    display: 'flex',
    transition: 'transform 0.5s ease',
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  return (
    <div className="overflow-hidden  shadow-md relative h-full w-full mx-auto sm:mb-0 mb-4">
      <div
        className='absolute z-50 right-10 mt-3'
      >
        <Buscador />
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 z-10 left-0 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-gray-500 text-white  p-4  hover:bg-gray-400 transition-colors duration-300"
      >
        <img src={izquiera} alt="Izquierda" className="h-6 w-6" />
      </button>

      {/* Contenedor de Imágenes */}
      <div className="flex" style={containerStyle}>
        {Imagenes.map((imagen, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{ width: '100%' }}
          >
            <img
              onError={(e) => {
                e.target.src = imagen_No_funtion;
              }}
              src={imagen.imagen}
              alt={`Imagen ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Flecha Derecha */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-gray-500 text-white  p-4 hover:bg-gray-400 transition-colors duration-300"
      >
        <img src={derecha} alt="Derecha" className="h-6 w-6" />
      </button>
    </div>
  );
};
