import React from 'react';

import { Footer } from '../../../components/Footer';
import { Layout } from "../../../components/Layout";
import { CarritoPedido } from "../CardDetallePedido/CarritoPedido";
import { CarritoComprasIcono, FormularioUsuario } from "../FormularioDeUsuario/Data";

export const TablaCarrito = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout />
      <div className="flex flex-col md:flex-row md:space-x-6 px-4  py-4">
        <div className="w-full md:w-1/2 lg:w-1/2 mb-4 md:mb-0">
          <FormularioUsuario />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3">
          <CarritoPedido />
        </div>
      </div>
      <Footer />
    </div>
  );
};
