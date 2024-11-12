import React from 'react';
import { Layout } from '../../../components/Layout';
import { DetallePedidos } from '../CardDetallePedido';
import { Footer } from '../../../components/Footer';
import { TablaInformacionProductoPedido } from './index';
import {CarritoComprasIcono, FormularioUsuario} from "../FormularioDeUsuario/Data"
export const TablaCarrito = () => {
  return (
    <div className='flex flex-col min-h-screen'>
  <Layout></Layout>
  <FormularioUsuario></FormularioUsuario>

  <Footer></Footer>
    </div>
  );
};
