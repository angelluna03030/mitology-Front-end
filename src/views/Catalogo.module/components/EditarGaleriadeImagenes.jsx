import { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { GaleriaImagenes } from '../../../components/GaleriadeImagenes';
import { getData } from '../../../config/utils/metodoFecht';
const API_KEY = import.meta.env.VITE_API_KEY;

const RUTA_API = import.meta.env.VITE_API_URL;

export const EditarGaleriaDeImagenes = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [catalogo, setCatalogo] = useState({
    imagenesparagaleria: [],
  });
  const [nuevasImagenes, setNuevasImagenes] = useState([]);
  const [imagenesEliminadas, setImagenesEliminadas] = useState([]);
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

  const eliminarImagen = indice => {
    const imagenEliminada = catalogo.imagenesparagaleria[indice];
    setCatalogo(prevState => ({
      ...prevState,
      imagenesparagaleria: prevState.imagenesparagaleria.filter(
        (_, i) => i !== indice,
      ),
    }));
    setImagenesEliminadas(prevState => [...prevState, imagenEliminada]);
  };

  const agregarImagenes = e => {
    const files = Array.from(e.target.files);
    if (catalogo.imagenesparagaleria.length + files.length > 10) {
      toast.error('No puedes tener más de 10 imágenes.');
      return;
    }
    setNuevasImagenes(prevState => [...prevState, ...files]);
  };

  const actualizarImagenes = async () => {
    const formData = new FormData();
    setEnviando(true); // Rehabilitar el botón una vez finalizado el proceso

    // Agregar las nuevas imágenes al FormData
    nuevasImagenes.forEach(img => {
      formData.append('files', img);
    });

    try {
      // Subir nuevas imágenes
      const respuesta = await fetch(`${RUTA_API}/public`, {
        method: 'POST',
        body: formData,
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        const nombresImagenes = data.files || [];

        // Combina las imágenes actuales que no han sido eliminadas con las nuevas imágenes subidas
        const imagenesActualizadas = [
          ...catalogo.imagenesparagaleria.filter(
            img => !imagenesEliminadas.includes(img),
          ),
          ...nombresImagenes,
        ];

        // Actualizar las imágenes en el catálogo
        const respuestaUpdate = await fetch(
          `${RUTA_API}/api/catalogo/imagenesparagaleria`,
          {
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
            body: JSON.stringify({ imagenesparagaleria: imagenesActualizadas }),
          },
        );

        if (respuestaUpdate.ok) {
          const dataUpdate = await respuestaUpdate.json();
          setCatalogo(dataUpdate);
          setNuevasImagenes([]);
          setImagenesEliminadas([]);
          toast.success('Imágenes actualizadas correctamente');
        } else {
          toast.error('Error al actualizar las imágenes en el catálogo');
          console.error(
            'Error al actualizar las imágenes:',
            respuestaUpdate.status,
          );
        }
      } else {
        toast.error('Error al subir las nuevas imágenes');
        console.error('Error al subir las nuevas imágenes:', respuesta.status);
      }
    } catch (err) {
      toast.error('Error al actualizar las imágenes');
      console.error('Error:', err);
    }
    setEnviando(false); // Rehabilitar el botón una vez finalizado el proceso
  };

  return (
    <>
      <Button onPress={onOpen}>Galería de Imágenes </Button>
      <Modal
        size='4xl'
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
                Editar Imágenes de Galería{' '}
                <p className='text-red-700'> (Solo 10 Imagenes)</p>
              </ModalHeader>
              <ModalBody>
                <div className='sm:mr-16'>
                  <GaleriaImagenes imagenes={catalogo.imagenesparagaleria} />
                </div>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {catalogo.imagenesparagaleria.map((img, index) => (
                    <div key={index} className='relative'>
                      <img
                        src={`${img}`}
                        alt={`Imagen ${index}`}
                        className='w-24 h-24 object-cover rounded'
                      />
                      <button
                        onClick={() => eliminarImagen(index)}
                        className='absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white'
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <div className='grid w-full max-w-xs items-center gap-1.5'>
                  <label className='text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Imágenes
                  </label>
                  <input
                    type='file'
                    id='picture'
                    multiple
                    onChange={agregarImagenes}
                    className='mt-4 flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium'
                  />
                </div>
              </ModalBody>
              <ModalFooter className='mr-32 sm:mr-0 sm:mt-5'>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color='primary'
                  onPress={actualizarImagenes}
                  disabled={enviando}
                >
                  {enviando ? <Spinner size='sm' color='danger' /> : 'Enviar'}
                </Button>
                <p className='text-red-700 mt-2'> (Solo 10 Imagenes)</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
