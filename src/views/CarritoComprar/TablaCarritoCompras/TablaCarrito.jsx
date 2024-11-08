import React from 'react';
import { Layout } from '../../../components/Layout';
import { DetallePedidos } from '../CardDetallePedido';
import { Footer } from '../../../components/Footer';
import { TablaInformacionProductoPedido } from './index';
export const TablaCarrito = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Layout />
      <TablaInformacionProductoPedido />
      <div className='flex flex-col flex-grow justify-end sm:mt-10'>
        <DetallePedidos />
        <Footer />
      </div>
    </div>
  );
};
