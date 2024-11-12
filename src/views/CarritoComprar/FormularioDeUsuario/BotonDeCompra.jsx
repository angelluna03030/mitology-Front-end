import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { postData } from "../../../config/utils/metodoFecht";
import { toast } from 'react-toastify';
const RUTA_API = import.meta.env.VITE_API_URL;
export const CarritoComprasIcono = ({ formData }) => {
  const buttonRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Valida si todos los campos requeridos tienen un valor
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
  
  const handleSubmit = async () => {
    if (!isFormComplete()) {
      return; // Si el formulario no está completo, no hace nada
    }
  
    setIsSubmitting(true); // Desactiva el botón mientras se envía la solicitud
  
    try {
      // Prepara los datos para enviar, eliminando aceptaTerminos y ajustando tipoIdentidad
      const preparedData = {
        ...formData,
        tipoDeDocumento: formData.tipoDeDocumento.anchorKey, // Solo enviar el valor de currentKey
      };
      delete preparedData.aceptaTerminos; // Eliminar el campo aceptaTerminos
 
      // Usa postData para enviar los datos
      const { status, dataResponse } = await postData(
        `${RUTA_API}/api/usuarios`,
        preparedData
      );
      if (status === 201) {
        if (dataResponse && dataResponse instanceof Object) {
          toast.success("Gracias por su compra espere unos segundos ");
          confetti({
            particleCount: 200,
            spread: 100,
            origin: {
              y: buttonRef.current.getBoundingClientRect().top / window.innerHeight,
              x: buttonRef.current.getBoundingClientRect().left / window.innerWidth + 0.072,
            },
          });
        } else {
          toast.error("Respuesta inesperada:", dataResponse);
        }
      } else {
        console.error("Error al crear el usuario:", dataResponse);
      }
      
    } catch (e) {
      console.error("Error de red:", e);
    } finally {
      setIsSubmitting(false); // Reactiva el botón después de completar la solicitud
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
        isDisabled={!isFormComplete() || isSubmitting} // Desactiva el botón si falta información o si se está enviando
      >
        Comprar Ahora
      </Button>
    </div>
  );
};
