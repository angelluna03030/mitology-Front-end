import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { GaleriaImagenes } from '../../components/GaleriadeImagenes';
import React, { useEffect, useState } from 'react';
import { Carrusel } from '../../components/CaruselImagenes';
import { VideoPlayer } from '../../components/Video';
import { Producto } from '../../components/Producto';
import { Footer } from '../../components/Footer';
import { Categorias } from '../../components/Categorias';
import { CarritoComprasIcono } from '../CarritoComprar/IconoCarritoCompras';
import { toast } from 'react-toastify';
import { getData } from '../../config/utils/metodoFecht';
import {IconWhastApp} from "../../components/WhatsApp"
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
      <Buscador />
      <Carrusel imagenes={catalogo.imagenesparavideo} />
      <Categorias />
      <div className='w-80 h-64 sm:w-96 justify-center items-center mb-64 ml-12  m-auto sm:m-auto sm:mb-52 '>
        <VideoPlayer video={catalogo.video} />
      </div>
      <div className='sm:m-auto sm:pt-56 sm:px-10 sm:mr-16 '>
        <GaleriaImagenes imagenes={catalogo.imagenesparagaleria} />
      </div>

      <Producto Ids={catalogo.productosdestacados} />
      <CarritoComprasIcono />
      <IconWhastApp></IconWhastApp>
      <Footer />
    </>
  );
};
