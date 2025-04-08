import { Layout } from '../../components/Layout';

import { GaleriaImagenes } from '../../components/GaleriadeImagenes';
import React, { useEffect, useState } from 'react';
import { Carrusel } from '../../components/CaruselImagenes';
import { VideoPlayer } from '../../components/Video';
import { Producto } from '../../components/Producto';
import { Footer } from '../../components/Footer';
import { Categorias } from '../../components/Categorias';
import { CarritoComprasIcono } from '../CarritoComprar/FormularioDeUsuario/Data';
import { toast } from 'react-toastify';
import { getData } from '../../config/utils/metodoFecht';
import { IconWhastApp } from "../../components/WhatsApp"
import { Descripcion } from '../../components/Descripcion/Descripcion';
const RUTA_API = import.meta.env.VITE_API_URL;
export const Catalogo = () => {
  const [catalogo, setCatalogo] = useState({
    imagenesparavideo: [],
    video: '',
    imagenesparagaleria: [],
    productosdestacados: [],
  });

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/catalogo`,
        );

        if (status >= 200 && status < 300) {
          if (dataResponse.length > 0) {
            // Asumiendo que solo hay un catálogo
            setCatalogo(dataResponse[0]);
          } else {
            toast.error('No se encontraron recursos');
          }
        } else {
          toast.error('No se encontraron los recursos (404)');
          console.error('Error al obtener el catálogo:', status);
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
        console.error('Error al traer el catálogo:', err);
      }
    };

    obtenerCatalogo();
  }, []); // Se ejecuta solo una vez cuando el componente se monta.

  return (
    <>
      <Layout />
      <Carrusel imagenes={catalogo.imagenesparavideo} />
      <div className="flex flex-col items-center justify-center "> <p className="text-center text-2xl sm:text-3xl sm:h-20 sm:my-36 my-10 md:text-5xl lg:text-6xl font-semibold mx-4 uppercase"> Inspirada en el pasado, creada para el presente ⚡ </p> </div>
      <div className='sm:m-auto sm:px-10 sm:mr-16 '>
        <GaleriaImagenes imagenes={catalogo.imagenesparagaleria} />
      </div>
      <Descripcion
        descripcion={catalogo.descripcion}
        imagen={catalogo.imagendescripcion}
        titulo={catalogo.titulodescripcion}
      />
      <p className='sm:ml-16 ml-4   text-3xl text-black font-semibold'>
        productos que pueden interesarte:
      </p>
      <Producto Ids={catalogo.productosdestacados} />
      <IconWhastApp></IconWhastApp>
      <Footer />
      {/**
       * "La tendencia oversize fusiona estilo y comodidad en siluetas amplias que permiten una expresión auténtica. Con MITOLOGY, cada diseño rinde homenaje a mitologías del pasado, uniendo historia y moda. Redefine tu estilo"
       * 
       */}
    </>
  );
};
