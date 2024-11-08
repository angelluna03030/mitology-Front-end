import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Navegacion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Tu sesión se cerrará y serás redirigido al catálogo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    }).then(result => {
      if (result.isConfirmed) {
        // Eliminar sesión
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('sessionExpiration');
        // Redirigir al catálogo
        navigate('/catalogo');
        Swal.fire(
          'Sesión cerrada',
          'Tu sesión ha sido cerrada exitosamente.',
          'success',
        );
      }
    });
  };

  return (
    <div className='md:flex flex-col md:flex-row md:min-h-screen w-full'>
      <div className='flex flex-col w-full md:w-64 text-gray-700 bg-gray-300 dark:text-gray-200 dark:bg-gray-800 flex-shrink-0'>
        <div className='flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between'>
          <Link
            to={'/'}
            className='text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline'
          >
            DELUXE
          </Link>
          <button
            className='rounded-lg md:hidden focus:outline-none focus:shadow-outline'
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg fill='currentColor' viewBox='0 0 20 20' className='w-6 h-6'>
              {isOpen ? (
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              ) : (
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
        >
          <Link
            className='block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline '
            to={'/registrarproductos'}
          >
            Producto
          </Link>
          <Link
            className='block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
            to={'/registrarcategoria'}
          >
            Categoria
          </Link>
          <Link
            className='block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
            to={'/registrarcatalogo'}
          >
            Catalogo
          </Link>
          <button
            className='block w-full text-left px-4 py-2 mt-2 text-sm font-semibold  text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-red-600 dark:focus:bg-red-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navegacion;
