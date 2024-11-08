import { useState } from "react";
import IconoCarritoWhastApp from "../../assets/whatsapp.png";
import fondodemesagges from "../../assets/fondodemessajes.jpg";
import enviar_mensaje from "../../assets/enviar-mensaje.png";
import logo from "../../assets/icon.png"; // Imagen de encabezado

export const IconWhastApp = () => {
  const [openChat, setOpenChat] = useState(false); // Controla la apertura del chat
  const [message, setMessage] = useState(""); // Guarda el mensaje que el usuario escribe

  // Función para manejar el envío de mensaje a WhatsApp
  const handleSendMessage = () => {
    const whatsappUrl = `https://wa.me/573017996301?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setMessage("")
  };

  return (
    <>
      {/* Ícono de WhatsApp */}
      <div
        onClick={() => setOpenChat(!openChat)} // Abrir/cerrar el chat
        className='z-40 fixed bottom-4 right-4 bg-[#26C281] rounded-full sm:w-16 sm:h-16 flex items-center justify-center shadow-md cursor-pointer transition duration-300 w-14 h-14 border-x-slate-100 shadow-[#ffffff]'
      >
        <img
          src={IconoCarritoWhastApp}
          alt='WhatsApp Chat'
          className='sm:w-8 sm:h-8 w-6 h-6'
        />
      </div>

      {/* Modal de Chat estilo WhatsApp con animación */}
      <div
        className={`fixed bottom-20 right-4 z-40 w-80 bg-white rounded-lg shadow-lg border border-gray-300  mr-12  transform transition-transform duration-500 ${
          openChat ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{ transitionTimingFunction: 'ease-in-out' }}
      >
        {/* Encabezado del chat (modo oscuro) */}
        <div className="bg-[#075E54] p-4 rounded-t-lg flex items-center  fixed z-30">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full mr-4" // Imagen redondeada
          />
          <span className="text-white font-semibold text-lg">
            Enviar un Mensaje a DELUXE
          </span>
        </div>

        <div className="relative">
          {/* Fondo del chat */}
          <img
            src={fondodemesagges}
            alt="Fondo de Mensajes"
            className="absolute inset-0 h-full w-full object-cover rounded-lg"
          />
          {/* Contenido del chat */}
          <div className="relative z-10 p-4 flex flex-col space-y-4 h-80 ">
            <div className="flex-grow overflow-y-auto space-y-2">
              {/* Aquí aparecerían los mensajes */}
              <div className="bg-[#DCF8C6] text-gray-800 p-2 rounded-lg max-w-[75%] self-end mt-24">
                Contáctanos. Servicio al cliente. Deluxe Uniformes. ¡Hola! 👋🏼 ¿En qué te puedo ayudar?
              </div>
            </div>
            {/* Input de mensaje */}
            <div className="flex items-center bg-[#d3d3d3] rounded-full px-4 py-2 shadow-md">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje"
                className="flex-grow bg-transparent focus:outline-none "
              />
              <img
                src={enviar_mensaje}
                alt="Enviar Mensaje"
                className="w-6 h-6 cursor-pointer"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
