import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Documento = import.meta.env.VITE_DOCUMENTO;
const password = import.meta.env.VITE_PASSWORD;

export const Sesion = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Comprobar si ya hay una sesión activa
  useEffect(() => {
    const sessionExpiration = localStorage.getItem('sessionExpiration');
    if (sessionExpiration && new Date() < new Date(sessionExpiration)) {
      navigate('/registrarproductos');
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('sessionExpiration');
    }
  }, [navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const userDoc = form.elements['email'].value;
    const userPassword = form.elements['password'].value;

    if (userDoc === Documento && userPassword === password) {
      // Guardar autenticación y tiempo de expiración
      localStorage.setItem('isAuthenticated', true);
      const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hora
      localStorage.setItem('sessionExpiration', expirationTime.toISOString());
      navigate('/registrarproductos');
    } else {
      setAttempts(prev => prev + 1);
      setError('Documento o contraseña incorrectos');
      if (attempts >= 2) {
        alert(
          'Demasiados intentos fallidos. Intenta nuevamente en 10 minutos.',
        );
        setTimeout(
          () => {
            setAttempts(0);
          },
          10 * 60 * 1000,
        ); // 10 minutos de espera
      }
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-96 relative p-4 rounded-md text-black bg-colorprimary m-auto mt-36 md:max-w-3xl md:mt-34 lg:mt-24 xl:mt-24 2xl:mr-2 2xl:ml-2 2xl:mt-24 justify-center'>
        <div className='text-xl md:text-2xl font-bold mb-2 text-[#1e0e4b] text-center'>
          Bienvenida <span className='text-[#7747ff]'>Marisol</span>
        </div>
        <div className='text-xs md:text-sm font-normal mb-4 text-center text-[#1e0e4b]'>
          Inicia sesión en tu cuenta
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-5'
        >
          <div className='block relative'>
            <label
              htmlFor='email'
              className='block text-gray-600 cursor-text text-xs md:text-sm leading-[140%] font-normal mb-2'
            >
              Documento
            </label>
            <input
              type='number'
              id='email'
              className='rounded border border-gray-200 text-xs md:text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 md:h-11 m-0 p-[10px] md:p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0'
              required
            />
          </div>
          <div className='block relative'>
            <label
              htmlFor='password'
              className='block text-gray-600 cursor-text text-xs md:text-sm leading-[140%] font-normal mb-2'
            >
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              className='rounded border border-gray-200 text-xs md:text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 md:h-11 m-0 p-[10px] md:p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0'
              required
            />
          </div>
          {error && <div className='text-red-500 text-sm'>{error}</div>}
          <div>
            <a
              className='text-xs md:text-sm text-[#7747ff]'
              href='https://wa.me/573213754980?text=Angel%2C%20olvid%C3%A9%20mi%20contrase%C3%B1a'
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type='submit'
            className='bg-[#7747ff] w-max m-auto px-4 py-2 md:px-6 md:py-2 rounded text-white text-xs md:text-sm font-normal hover:bg-[#5a37cc] transition-colors duration-200'
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
};
