import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { postData } from "../../../config/utils/metodoFecht";
import { toast } from "react-toastify";
import React, { useContext } from "react";
import { CarritoContext } from "../../../states/context/ContextCarrito";
import { Colores } from "../../Productos.modulo/components/DataColores";

const RUTA_API = import.meta.env.VITE_API_URL;

export const CarritoComprasIcono = ({ formData }) => {
  const buttonRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { carrito, calcularTotal, vaciarCarrito } = useContext(CarritoContext);

  const obtenerNombreColor = (colorHex) => {
    const colorEncontrado = Colores.find((c) => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };

  const isFormComplete = () => {
    return (
      formData.nombres &&
      formData.apellidos &&
      formData.numeroDeDocumento &&
      formData.tipoDeDocumento &&
      formData.correo &&
      formData.numeroDeCelular &&
      formData.direccion &&
      formData.barrio &&
      formData.ciudad &&
      formData.departamento &&
      formData.aceptaTerminos
    );
  };

  const generarMensajeWhatsApp = () => {
    const subtotal = calcularTotal();
    const envio = 16000; // Establecemos el costo de envío en 16,000
    const total = subtotal + envio;

    // Inicia el mensaje con la introducción y los datos del cliente
    let mensaje = `Gracias por su compra! 🎉\n\nResumen de su orden:\n========================\n`;
    mensaje += `Nombre: ${formData.nombres} ${formData.apellidos}\n`;
    mensaje += `Documento: ${formData.tipoDeDocumento.anchorKey} ${formData.numeroDeDocumento}\n`;
    mensaje += `Correo: ${formData.correo}\n`;
    mensaje += `Teléfono: ${formData.numeroDeCelular}\n`;
    mensaje += `Dirección: ${formData.direccion}, ${formData.barrio}, ${formData.ciudad}, ${formData.departamento}\n`;
    mensaje += `========================\n`;

    // Añade los detalles de cada producto
    carrito.forEach((producto) => {
      mensaje += `- ${producto.cantidad} *${producto.nombre}* - Talla: ${producto.talla}, Color: ${obtenerNombreColor(producto.color)}, Precio: _$${producto.precio.toLocaleString("es-CO")}_\n`;
    });

    // Añade los totales de la orden
    mensaje += `========================\nSubtotal: *$${subtotal.toLocaleString("es-CO")}*\n`;
    mensaje += `Envío: *$${envio.toLocaleString("es-CO")}*\n`; // Ahora siempre muestra el costo de envío
    mensaje += `Total: *$${total.toLocaleString("es-CO")}*\n`;
    mensaje += `========================\n`;

    return mensaje;
  };

  const handleEnviarWhatsApp = () => {
    const mensaje = generarMensajeWhatsApp();
    const numeroWhatsApp = "3332807534"; // Número de WhatsApp destino
    const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank"); // Abre la URL en una nueva pestaña
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) {
      return;
    }
    setIsSubmitting(true);

    try {
      const preparedData = {
        ...formData,
        tipoDeDocumento: formData.tipoDeDocumento.anchorKey, // Solo enviar el valor de currentKey
      };
      delete preparedData.aceptaTerminos; // Eliminar el campo aceptaTerminos

      const { status, dataResponse } = await postData(
        `${RUTA_API}/api/usuarios`,
        preparedData
      );

      if (status === 201) {
        toast.success("Gracias por su compra, espere unos segundos.");

        confetti({
          particleCount: 200,
          spread: 100,
          origin: {
            y: buttonRef.current.getBoundingClientRect().top / window.innerHeight,
            x: buttonRef.current.getBoundingClientRect().left / window.innerWidth + 0.072,
          },
        });

        setTimeout(() => {
          handleEnviarWhatsApp(); // Llama a la función para enviar el mensaje de WhatsApp
          vaciarCarrito(); // Vacía el carrito después de la compra
        }, 3000);
      } else {
        console.error("Error al crear el usuario:", dataResponse);
        toast.error("Hubo un error en el proceso de compra.");
      }
    } catch (e) {
      console.error("Error de red:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        ref={buttonRef}
        disableRipple
        className="overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
        size="lg"
        onPress={handleSubmit}
        isDisabled={!isFormComplete() || isSubmitting}
      >
        Comprar Ahora
      </Button>
    </div>
  );
};
