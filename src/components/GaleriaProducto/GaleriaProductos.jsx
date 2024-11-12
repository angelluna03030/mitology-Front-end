import { Image } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';

export const GaleriaProductos = ({ imagenes = [] }) => {
  const [active, setActive] = useState(imagenes[0]?.src || '');

  useEffect(() => {
    const changeImage = () => {
      const nextImageIndex = (activeIndex =>
        (activeIndex + 1) % imagenes.length)(
        imagenes.findIndex(img => img.src === active)
      );
      setActive(imagenes[nextImageIndex].src);
    };

    const timer = setTimeout(changeImage, 5000);
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [active, imagenes]);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl">
        {/* Imagen activa */}
        <div className="relative h-96 w-96 m-auto mb-8">
          <Image
            layout="fill"
            className="rounded-lg object-cover object-center "
            src={active}
            alt="Active Product"
            onError={e => {
              e.target.src = imagen_No_funtion;
            }}
          />
        </div>

        {/* Galería de imágenes en miniatura */}
        <div className="grid sm:grid-cols-5 grid-cols-4 gap-4 mt-auto">
          {imagenes.map((imagen, index) => (
            <div
              key={index}
              className={`relative w-24 h-24 flex items-center justify-center sm:w-24 sm:h-24 mx-1 cursor-pointer
                ${active === imagen.src ? 'border-2 border-black opacity-100' : 'opacity-50'}
                hover:opacity-100 hover:border hover:border-black transition-all duration-300 ease-in-out
            
                `}
              onClick={() => setActive(imagen.src)}
            >
              <Image
                onError={e => {
                  e.target.src = imagen_No_funtion;
                }}
                src={imagen.src}
                alt={imagen.alt || `Imagen ${index + 1}`}
                className="w-full h-full object-cover rounded-lg "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
