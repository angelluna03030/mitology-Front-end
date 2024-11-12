import React from 'react';

export const Factura = () => {
  return (
    <div className="w-full  mx-2 mt-4 p-4  ">
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Subtotal: <span className="font-semibold">3 Item</span></p>
        <p className="text-gray-800 font-semibold">$400.000,00</p>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Envío</p>
        <p className="text-gray-800 line-through">$9.000,00</p>
        <p className="text-green-600 font-semibold">GRATIS</p>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Total</p>
        <p className="text-gray-800 font-semibold">COP</p>
        <p className="text-gray-800 font-semibold">$400.000,00</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-600">AHORRO TOTAL</p>
        <p className="text-gray-800 font-semibold">$9.000,00</p>
      </div>
    </div>
  );
};
