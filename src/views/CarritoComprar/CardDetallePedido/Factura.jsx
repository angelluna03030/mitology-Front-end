import React, { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';

export const Factura = () => {
  const { carrito, contarProductos, calcularTotal } = useContext(CarritoContext);

  const formatearPrecio = (precio) => {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Verificar si hay productos en el carrito
  const tieneProductos = contarProductos() > 0;
  const totalCompra = tieneProductos ? calcularTotal() : 0;
  const envio = tieneProductos && totalCompra > 179999 ? 0 : tieneProductos ? 9000 : 0;
  const totalConEnvio = totalCompra + envio;

  return (
    <div className="w-full mx-2 mt-4 p-4">
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Subtotal: <span className="font-semibold">{tieneProductos ? contarProductos() : 0} Item</span></p>
        <p className="text-gray-800 font-semibold">${formatearPrecio(totalCompra)},00</p>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Envío</p>
        {envio === 0 ? (
          <p className="text-green-600 font-semibold text-[#00C04b]">GRATIS</p>
        ) : (
          <p className="text-gray-800 font-semibold">${formatearPrecio(envio)},00</p>
        )}
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Total</p>
        <p className="text-gray-800 font-semibold">COP</p>
        <p className="text-gray-800 font-semibold">${formatearPrecio(totalConEnvio)},00</p>
      </div>
      {envio === 0 && tieneProductos && (
        <div className="flex justify-between">
          <p className="text-gray-600">AHORRO TOTAL</p>
          <p className="text-gray-800 font-semibold">$9.000,00</p>
        </div>
      )}
    </div>
  );
};
