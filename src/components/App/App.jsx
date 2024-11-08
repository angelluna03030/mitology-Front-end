import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import StateCarrito from '../../states/context/StateCarrito';
import { Rutas } from '../../routes';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <StateCarrito>
        <BrowserRouter>
          <Rutas />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />
        </BrowserRouter>
      </StateCarrito>
    </>
  );
}
