import React, { useEffect, useState } from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';
const API_KEY = import.meta.env.VITE_API_KEY;
const RUTA_API = import.meta.env.VITE_API_URL;
export const Producto = ({ Ids }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const obtenerCatalogo = async () => {
      setLoading(true); // Comienza la carga
      try {
        const response = await fetch(`${RUTA_API}/api/productos/ids`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({ id: Ids }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProductos(data);
          } else {
            toast.error('No se encontraron productos');
          }
        }
      } catch (err) {
        toast.error('No se ha podido traer los productos');
        console.error('Error al traer los productos:', err);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    if (Ids) {
      obtenerCatalogo();
    }
  }, [Ids]); // Se ejecuta cada vez que Ids cambia

  if (!Ids) {
    return (
      <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
        <Skeleton className='rounded-lg  sm:m-5  h-96 w-80 m-auto mb-10' />;
      </div>
    );
  }

  if (!Ids) {
    // Muestra un mensaje o componente alternativo si Ids no está disponible
    return <p>Id no disponible</p>;
  }

  return (
    <div className='container mx-auto p-4 lg:min-h-screen flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {productos.map(producto => (
          <Link to={`/producto/${producto._id}`} key={producto._id}>
            <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
              <img
                onError={e => {
                  e.target.src = imagen_No_funtion;
                }}
                src={
                  producto.imagenes[0]
                    ? `${producto.imagenes[0]}`
                    : imagen_No_funtion
                }
                alt={producto.nombreproductos}
                className='w-full h-auto object-cover rounded-lg'
              />
              <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
                <h1 className='text-lg sm:text-2xl font-semibold'>
                  {producto.nombreproductos}
                </h1>
                <p className='mt-1 sm:mt-2'>
                  {producto.descripcion || 'Descripción no disponible.'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
