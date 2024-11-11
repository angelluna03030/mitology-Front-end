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
  const producto = [
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    {
      _id: 1,
      imagenes: ["https://mitology.com.co/cdn/shop/files/Virtualthreads_-_2024-10-19T115734.951.png?v=1729542413&width=1206", "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750"],
      nombreproductos: "Oversize JANUS DOS CARAS",
      descripcion: "80.000"

    },
    
  ]
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
      <div className='container mx-auto p-4 lg:min-h-screen flex items-center justify-center'>
 <div className='flex '>
        <Skeleton className='w-56 sm:w-56 mx-4 relative shadow-sm hover:shadow-md rounded-lg cursor-pointer h-80  hover:underline sm:mx-8' />
        <Skeleton className='w-56 sm:w-56 mx-4 relative shadow-sm hover:shadow-md rounded-lg cursor-pointer h-80  hover:underline sm:mx-8' />
        <Skeleton className='w-56 sm:w-56 mx-4 relative shadow-sm hover:shadow-md rounded-lg cursor-pointer h-80  hover:underline sm:mx-8' />
        <Skeleton className='w-56 sm:w-56 mx-4 relative shadow-sm hover:shadow-md rounded-lg cursor-pointer h-80  hover:underline sm:mx-8' />
     
      </div>

      </div>
     
    );
  }

  if (!Ids) {
    // Muestra un mensaje o componente alternativo si Ids no está disponible
    return <p>Id no disponible</p>;
  }

  return (
    <div className='container mx-auto p-4 lg:min-h-screen flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {producto.map(producto => (
          <Link to={`/producto/${producto._id}`} key={producto._id}>
      <div className='w-56 sm:w-56 mx-4 relative shadow-sm hover:shadow-md rounded-lg cursor-pointer h-80 hover:underline sm:mx-8 transition-shadow duration-400'>
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
    className='w-full h-48 object-cover rounded-t-lg transition-opacity duration-500 hover:opacity-0'
  />
  <img
    onError={e => {
      e.target.src = imagen_No_funtion;
    }}
    src={
      producto.imagenes[1]
        ? `${producto.imagenes[1]}`
        : imagen_No_funtion
    }
    alt={producto.nombreproductos}
    className='w-full h-48 object-cover rounded-t-lg absolute top-0 left-0 transition-opacity duration-500 opacity-0 hover:opacity-100'
  />
  <div className='h-20 sm:h-20 backdrop-blur text-white p-4 rounded-b-lg'>
    <h1 className='text-lg sm:text-lg items-center justify-center text-center font-semibold text-[#787878]'>
      {producto.nombreproductos}
    </h1>
    <p className='mt-1 sm:mt-2 text-[#B9B9B9] items-center justify-center text-center underline-offset-0'>
      {producto.descripcion + ",00 COP" || 'No hay Precio Disponible.'}
    </p>
  </div>
</div>


          </Link>
        ))}
      </div>
    </div>
  );
};
