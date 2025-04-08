import React from 'react';
import '../../styles/index.css'; // Asegúrate de importar tu archivo CSS
import { Link } from 'react-router-dom';
import imagen_No_funtion from '../../assets/no-fotos.png';

export const CardCategoria = ({ name, price, imageSrc = [], id }) => {
  return (
    <Link to={`/producto/${id}`} key={id}>
      <div className="w-44 sm:w-60 mx-1  relative  hover:shadow-md cursor-pointer h-auto  hover:underline sm:mx-8 transition-shadow duration-400">
        <img
          onError={e => {
            e.target.src = imagen_No_funtion;
          }}
          src={
            imageSrc.length > 0 && imageSrc[0]
              ? `${imageSrc[0]}`
              : imagen_No_funtion
          }
          alt={name}
          className="w-full h-48 object-cover transition-opacity duration-500 hover:opacity-0"
        />
        <img
          onError={e => {
            e.target.src = imagen_No_funtion;
          }}
          src={
            imageSrc.length > 1 && imageSrc[1]
              ? `${imageSrc[1]}`
              : imagen_No_funtion
          }
          alt={name}
          className="w-full h-48 object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 hover:opacity-100"
        />
        <div className="h-20 sm:h-20 backdrop-blur text-white p-4">
          <h1 className="text-lg sm:text-lg items-center justify-center text-center font-semibold text-[#000000]">
            {name}
          </h1>
          <p className="mb-4 sm:mt-2 text-[#000000] items-center justify-center text-center  underline-offset-0">
            {price.toLocaleString("es-CO", { style: "currency", currency: "COP" })  || 'No hay Precio Disponible.'}
          </p>
        </div>
      </div>
    </Link>
  );
};
