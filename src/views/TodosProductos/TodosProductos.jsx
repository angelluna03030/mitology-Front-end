import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { CardCategoria } from '../../components/Card';

import { useState, useEffect } from 'react';
import { Skeleton } from '@nextui-org/react';
import { TablaVaciaImagen } from '../../components/NoProductos';
import { getData } from '../../config/utils/metodoFecht';
import { IconWhastApp } from "../../components/WhatsApp";

const RUTA_API = import.meta.env.VITE_API_URL;

export const TodosProductos = () => {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductos = async () => {
      setLoading(true);
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/productos`,
        );

        if (status >= 200 && status < 300) {
          const productosFiltrados = dataResponse.filter(
            producto => producto.estado !== 0,
          );
          setProductos(productosFiltrados);

        } else {
          toast.error('Error al cargar los productos');
          console.error('Error al cargar los productos:', status);
        }
      } catch (error) {
        toast.error('Error al cargar los productos');
        console.error('Error cargando los productos:', error);
      } finally {
        setLoading(false);
      }
    };


    loadProductos();
  }, []);
  return (
    <>
      <Layout />
     <div className='bg-black w-full'>
      
<Buscador></Buscador>
      </div> 
      <div className='flex min-h-screen px-2'>
        <div className='w-full'>
          {loading ? (
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mb-10 m-auto'>
              {[...Array(12)].map((_, index) => (
                <Skeleton key={index} className='rounded-lg w-full h-52 m-2' />
              ))}
            </div>
          ) : productos.length > 0 ? (
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mb-10 sm:mx-20'>
              {productos.map(producto => (
                <CardCategoria
                  key={producto._id}
                  id={producto._id}
                  name={producto.nombreproductos}
                  price={producto.precio}
                  imageSrc={producto.imagenes} // Pasa `imagenes` como un array
                />
              ))}
             

            </div>
          ) : (
            <div className='flex justify-center m-20'>
              <TablaVaciaImagen  busqueda={query}/>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
