import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
const RUTA_API = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
import { VideoPlayer } from '../../../components/Video';
import { getData } from '../../../config/utils/metodoFecht';
const API_KEY = import.meta.env.VITE_API_KEY;

export const EditarVideo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [catalogo, setCatalogo] = useState({
    video: '',
  });
  const [nuevoVideo, setNuevoVideo] = useState(null);
  const [enviando, setEnviando] = useState(false); // Nuevo estado

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/catalogo`,
        );

        if (status >= 200 && status < 300) {
          if (dataResponse.length > 0) {
            setCatalogo(dataResponse[0]);
          } else {
            toast.error('No se encontraron recursos');
          }
        } else {
          toast.error('No se encontraron los recursos (404)');
          console.error('Error al obtener el catálogo:', status);
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
        console.error('Error al traer el catálogo:', err);
      }
    };

    obtenerCatalogo();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  const manejarCambioVideo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      // El tamaño está en bytes, por lo que comparamos con 20 MB (20 * 1024 * 1024)
      const maxSize = 20 * 1024 * 1024;
  
      if (archivo.size > maxSize) {
        toast.error('El video supera el límite de 20 MB.');
        return; // No continuar si el archivo excede el tamaño
      }
  
      setNuevoVideo(archivo);
    }
  };
  
  const actualizarVideo = async () => {
    if (!nuevoVideo) {
      toast.error('Por favor, selecciona un video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', nuevoVideo);

    setEnviando(true); // Deshabilitar el botón y mostrar el spinner

    try {
      // Subir el nuevo video
      const respuesta = await fetch(`${RUTA_API}/public/videos`, {
        method: 'POST',
        body: formData,
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        const nombreVideo = data.files[0];

        // Actualizar el video en el catálogo
        const respuestaUpdate = await fetch(`${RUTA_API}/api/catalogo/video`, {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ video: nombreVideo }),
        });

        if (respuestaUpdate.ok) {
          const dataUpdate = await respuestaUpdate.json();
          setCatalogo(dataUpdate);
          setNuevoVideo(null);
          toast.success('Video actualizado correctamente');
        } else {
          toast.error('Error al actualizar el video en el catálogo');
          console.error(
            'Error al actualizar el video:',
            respuestaUpdate.status,
          );
        }
      } else {
        toast.error('Error al subir el video');
        console.error('Error al subir el video:', respuesta.status);
      }
    } catch (err) {
      toast.error('Error al actualizar el video');
      console.error('Error:', err);
    } finally {
      setEnviando(false); // Rehabilitar el botón una vez finalizado el proceso
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Editar Video</Button>
      <Modal
        backdrop='opaque'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Cambiar El Video
              </ModalHeader>
              <ModalBody>
                <div className='h-96 w-52 m-auto'>
                  <VideoPlayer video={catalogo.video} />
                </div>
                <div className='grid w-full max-w-xs items-center gap-1.5 mt-4'>
                  <label className='text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Nuevo Video
                  </label>
                  <input
                    type='file'
                    id='video'
                    accept='video/*'
                    onChange={manejarCambioVideo}
                    className='mt-2 flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium'
                  />
                </div>
              </ModalBody>
              <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color='primary'
                  onPress={actualizarVideo}
                  disabled={enviando}
                >
                  {enviando ? <Spinner size='sm' color='danger' /> : 'Enviar'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
