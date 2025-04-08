import { Modal, ModalContent, Input, Autocomplete, AutocompleteItem, ModalHeader, ModalBody, ModalFooter, Button, Image } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { Link } from 'react-router-dom';
import { Departamentos } from "../../views/CarritoComprar/FormularioDeUsuario/informacion";
import { validarNombre2 } from "../../views/CarritoComprar/FormularioDeUsuario/Validaciones";

import {Colores} from "../../views/Productos.modulo/components/DataColores"
export const FormularioCompra = ({ isOpen, onClose }) => {
    const { carrito, eliminarProducto, contarProductos, calcularTotal, vaciarCarrito } = useContext(CarritoContext);
    const [formData, setFormData] = useState({
        nombres: "",
        direccion: "",
        barrio: "",
        ciudad: "",

    });

    const [errors, setErrors] = useState({});
    const obtenerNombreColor = (colorHex) => {
        const colorEncontrado = Colores.find((c) => c.color === colorHex);
        return colorEncontrado ? colorEncontrado.label : colorHex;
      };
    
    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleBlur = (field, value) => {
        let error = "";
        switch (field) {
            case "nombres":
                error = validarNombre2(value);
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };
    const formatearPrecio = (precio) => {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const tieneProductos = contarProductos() > 0;
    const totalCompra = tieneProductos ? calcularTotal() : 0;
    const envio = tieneProductos && totalCompra > 179999 ? 0 : tieneProductos ? 16000 : 0;
    const totalConEnvio = totalCompra + envio;
    const handleSubmit = async () => {
        handleEnviarWhatsApp();
    }
    const generarMensajeWhatsApp = () => {
        const subtotal = calcularTotal();
        const envio = subtotal > 100000 ? 0 : 16000;
        const total = subtotal + envio;
    
        let mensaje = `Gracias por su compra!\n`;
        mensaje += `Resumen de su orden:\n`;
        mensaje += `\n========================\n`;
        mensaje += `Nombre: ${formData.nombres}\n`;
        mensaje += `Dirección: ${formData.direccion}, ${formData.barrio}, ${formData.ciudad}\n`;
        mensaje += `\n========================\n`;
    
        carrito.forEach((producto) => {
            mensaje += `${producto.cantidad} x ${producto.nombre}\n`;
            mensaje += `Talla: ${producto.talla}\n`;
            mensaje += `Color: ${obtenerNombreColor(producto.color)}\n`;
            mensaje += `Precio: $${producto.precio.toLocaleString("es-CO")}\n`;
        });
    
        mensaje += `\n========================\n`;
        mensaje += `Subtotal: $${subtotal.toLocaleString("es-CO")}\n`;
        mensaje += `Envío: ${envio === 0 ? "GRATIS" : `$${envio.toLocaleString("es-CO")}`}\n`;
        mensaje += `Total: $${total.toLocaleString("es-CO")}\n`;
        mensaje += `\n========================\n`;
    
        return mensaje;
    };
    
    
    const handleEnviarWhatsApp = () => {
        const mensaje = generarMensajeWhatsApp();
        console.log("Mensaje generado:", mensaje); // Depuración
        const numeroWhatsApp = "3332807534";
        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        console.log("URL de WhatsApp:", url); // Depuración
        vaciarCarrito()
        window.open(url, "_blank");

    };
    
    
    return (
        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>Resumen de compra</ModalHeader>
                <ModalBody>
                    <div className=' flex flex-wrap items-center justify-center'>
                        {carrito.map((item, index) => (
                            <div key={item.id} className=' border-b mt-3 border-indigo-500  flex w-full' >
                                <div className='flex items-center justify-between w-full'>
                                    {/* Imagen y contador */}
                                    <p className='w-4 mb-16 h-4 flex justify-center items-center text-center text-xs text-white bg-gray-400 rounded-full'>
                                    {tieneProductos ? contarProductos() : 0}

                                    </p>
                                    <div className='flex items-center'>
                                        <Image className='w-16 m-2' src={item.imagen} alt={item.nombre} />
                                    </div>

                                    {/* Nombre del producto y talla */}
                                    <div className='flex flex-col flex-grow mx-2'>
                                        <p className='text-lg font-bold underline text-pretty'>
                                            <Link to={`/producto/${item.id}`}>{item.nombre}</Link>
                                        </p>
                                        <p className='text-lg'>{item.talla}</p>
                                    </div>

                                    {/* Precio y botón eliminar alineados a la derecha */}
                                    <div className='flex  items-end'>
                                        <p className='text-lg font-bold'>${formatearPrecio(item.precio)},00</p>
                                        <button
                                            className="w-6 ml-3 h-6 bg-black text-white hover:bg-red-600 flex items-center justify-center mt-2"
                                            onClick={() => eliminarProducto(item.id)}
                                        >
                                            x
                                        </button>
                                    </div>
                                </div>

                            </div>

                        ))}
                        <div className="w-full mt-4 p-4 bg-gray-200 rounded-md">
                            <div className="flex justify-between mb-2">
                                <p className="text-gray-600">Subtotal: <span className="font-semibold">{tieneProductos ? contarProductos() : 0} Item</span></p>
                                <p className="text-gray-800 font-semibold">${formatearPrecio(totalCompra)},00</p>
                            </div>
                            <div className="flex justify-between mb-2 ">
                                <p className="text-gray-600">Envío</p>
                                {envio === 0 ? (
                                    <p className="text-green-600 font-semibold text-[#00C04b]">GRATIS</p>
                                ) : (
                                    <p className="text-gray-800 font-semibold ">${formatearPrecio(envio)},00</p>
                                )}
                            </div>
                            <div className="flex justify-between mb-2  border-t border-indigo-500">
                                <p className="text-gray-600">Total</p>
                                <p className="text-gray-800 font-semibold">COP</p>
                                <p className="text-gray-800 font-semibold">${formatearPrecio(totalConEnvio)},00</p>
                            </div>
                            {envio === 0 && tieneProductos && (
                                <div className="flex justify-between">
                                    <p className="text-gray-600">AHORRO TOTAL</p>
                                    <p className="text-gray-800 font-semibold">$16.000,00</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className=" text-2xl w-full text-black font-bold items-center justify-center text-center">
                        Ingresa los siguientes datos
                        </div>
                        <div>

                            <Input
                                type="text"
                                label="Nombres"

                                placeholder="Ingresa tus nombres"
                                className="w-full my-3"
                                isInvalid={!!errors.nombres}
                                errorMessage={errors.nombres}
                                value={formData.nombres}
                                onChange={(e) => handleChange("nombres", e.target.value)}
                                onBlur={(e) => handleBlur("nombres", e.target.value)}
                                isRequired
                            />
                            <Input
                                type="text"
                                label="Dirreción"
                                placeholder="Ingresa tu dirección"
                                className="w-full"
                                value={formData.direccion}
                                onChange={(e) => handleChange("direccion", e.target.value)}
                                isRequired
                            />
                            <Input
                                type="text"
                                label="Barrio"

                                placeholder="Ingresa tu barrio"
                                className="w-full my-3"
                                value={formData.barrio}
                                onChange={(e) => handleChange("barrio", e.target.value)}
                                isRequired
                            />
                            <Autocomplete
                                label="Departamento"
                                className="w-full"
                                allowsCustomValue={true}
                                defaultItems={Departamentos.map((departamento) => ({
                                    key: departamento.nombre,
                                    label: departamento.nombre,
                                }))}

                                onSelectionChange={(value) => handleChange("departamento", value)}
                                onInputChange={(value) => handleChange("departamento", value)}
                                isRequired
                            >
                                {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                            </Autocomplete>

                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                  
                    <Button type='button'  onPress={handleSubmit} radius='none' className='font-semibold h-16 text-xl bg-black text-white w-full justify-center items-center text-center'>
            Comprar ${formatearPrecio(totalConEnvio)},00
          </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
