import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Input,
  Textarea,
  Image,
  Spinner,
} from '@nextui-org/react';
import { EditIcon } from '../../../states/icons/EditIcon';
import { getData, putData } from '../../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
import imagenloader from '../../../assets/imagen.svg';
const RUTA_API = import.meta.env.VITE_API_URL;

export const EditarDescripcion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [catalogo, setCatalogo] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [titulodescripcion, setTituloDescripcion] = useState('');
  const [imagendescripcion, setImagenDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setLoading(true);
        try {
          const { status, dataResponse } = await getData(`${RUTA_API}/api/catalogo`);
          if (status >= 200 && status < 300) {
            setCatalogo(dataResponse);
            setDescripcion(dataResponse.descripcion || '');
            setTituloDescripcion(dataResponse.titulodescripcion || '');
            setImagenDescripcion(dataResponse.imagendescripcion || '');
          } else {
            toast.error('No se encontraron los recursos (404)');
          }
        } catch (err) {
          toast.error('No se ha podido traer el catálogo');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [isOpen]);

  const handleUpdate = async () => {
    setEnviando(true);

    const updatedCatalogo = {
      descripcion,
      titulodescripcion,
      imagendescripcion,
    };

    try {
      const response = await putData(`${RUTA_API}/api/catalogo/descripcion`, updatedCatalogo);
      console.log('Descripción actualizada:', response);
      toast.success('Descripción actualizada con éxito');
      onClose();
    } catch (error) {
      toast.error('Error actualizando la descripción');
      console.error('Error updating description:', error);
    }
    setEnviando(false);
  };

  const handleFileChange = async event => {
    const files = event.target.files;
    if (files.length > 0) {
      const formDataToSend = new FormData();
      for (const file of files) {
        formDataToSend.append('files', file);
      }
  
      try {
        const response = await fetch(`${RUTA_API}/public`, {
          method: 'POST',
          body: formDataToSend,
        });
  
        if (!response.ok) {
          throw new Error('Error en la subida de imágenes');
        }
  
        const imageData = await response.json();
        console.log(imageData.message);
        
        // Asegúrate de que la respuesta es lo que esperas y usa el estado correcto
        if (imageData.files && imageData.files.length > 0) {
          setImagenDescripcion(imageData.files[0]); // Cambia `setImagen` por `setImagenDescripcion`
        }
      } catch (error) {
        toast.error('Error subiendo la imagen');
        console.error('Error uploading image:', error);
      }
    }
  };
  

  return (
    <>
           <Button onPress={onOpen}>Galería de Descripcion </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalContent>
          <ModalHeader>
            <h3>Editar Descripción</h3>
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <label className='block mt-4'>
                  <span className='text-gray-700'>Imagen Descripción</span>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    className='mt-2'
                  />
                  {imagendescripcion && (
                    <Image
                      src={imagendescripcion}
                      alt='Imagen Actual'
                      width={100}
                      height={100}
                      className='mt-4 object-cover rounded-md'
                    />
                  )}
                </label>

                <Input
                  label='Título Descripción'
                  value={titulodescripcion}
                  onChange={e => setTituloDescripcion(e.target.value)}
                  className='mt-4'
                />

                <Textarea
                  label='Descripción'
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  rows={4}
                  className='mt-4'
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button auto flat color='error' onClick={onClose}>
              Cancelar
            </Button>
            <Button auto onClick={handleUpdate} disabled={enviando}>
              {enviando ? <Spinner size='sm' /> : 'Guardar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
