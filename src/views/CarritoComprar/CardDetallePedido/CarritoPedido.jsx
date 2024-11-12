import { Image } from "@nextui-org/react";
import { useState } from "react";
import { Factura } from "./Factura";

export const CarritoPedido = () => {
  const [carrito, setCarrito] = useState([
    {
      imagen: "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750",
      nombre: "Camisas",
      cantidad: 2,
      talla: "XL",
      precio: 9000000,
    },
    {
      imagen: "https://mitology.com.co/cdn/shop/files/CAMISAS.jpg?v=1729613140&width=750",
      nombre: "Camisas",
      cantidad: 1,
      talla: "L",
      precio: 9000000,
    }
  ]);

  const formatearPrecio = (precio) => {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const actualizarCantidad = (index, nuevaCantidad) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
  };

  const eliminarItem = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="w-full sm:px-16 mt-4">
      {carrito.map((pedido, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-center mb-6 p-4 border  border-gray-300  shadow-md">
          <button
            className="w-6 h-6 bg-black text-white hover:bg-red-600 mr-72 flex items-center justify-center mb-2 sm:mb-auto  sm:mr-3"
            onClick={() => eliminarItem(index)}
          >
            x
          </button>
          <div className="mb-4 sm:mb-0">
            <Image src={pedido.imagen} width={150} height={150} className="rounded-none" />
          </div>
          <div className="flex-grow text-center sm:text-left  sm:ml-10">
            <p className="text-2xl text-gray-700 font-semibold mb-1">{pedido.nombre}</p>
            <p className="text-lg text-gray-800 my-1">${formatearPrecio(pedido.precio)},00</p>
            <p className="text-lg text-gray-600 my-1">{pedido.talla}</p>
            <div className="flex items-center justify-center sm:justify-start my-3">
              <button
                className="w-7 h-8 bg-black text-white hover:bg-gray-400 font-semibold"
                onClick={() => actualizarCantidad(index, Math.max(pedido.cantidad - 1, 1))}
              >
                -
              </button>
              <input
                type="number"
                value={pedido.cantidad}
                className="w-12 h-8 text-end bg-black text-white "
                readOnly
              />
              <button
                className="w-8 h-8 bg-black text-white hover:bg-gray-400 font-semibold"
                onClick={() => actualizarCantidad(index, pedido.cantidad + 1)}
              >
                +
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-800">Total: ${formatearPrecio(pedido.precio * pedido.cantidad)},00</p>
          </div>
        </div>
      ))}
      <Factura></Factura>
    </div>
  );
};
