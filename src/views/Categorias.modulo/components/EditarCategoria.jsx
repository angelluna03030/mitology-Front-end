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
  CircularProgress,
  Image,
  Spinner,
} from '@nextui-org/react';
import { EditIcon } from '../../../states/icons/EditIcon';
import { getData, putData } from '../../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
import imagenloader from '../../../assets/imagen.svg';
const RUTA_API = import.meta.env.VITE_API_URL;

export const EditarCategoria = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoria, setCategoria] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false); // Nuevo estado

  const [errors, setErrors] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  useEffect(() => {
    if (
      nombre &&
      (nombre.length < 5 ||
        nombre.length > 15 ||
        /\d/.test(nombre) ||
        /\s$/.test(nombre))
    ) {
      setErrors(prev => ({
        ...prev,
        nombre:
          'El nombre debe contener entre 5 y 15 letras sin números y no debe tener espacios al final.',
      }));
    } else {
      setErrors(prev => ({ ...prev, nombre: '' }));
    }
    if (descripcion && (descripcion.length < 15 || descripcion.length > 100)) {
      setErrors(prev => ({
        ...prev,
        descripcion: 'La descripción debe tener entre 15 y 100 caracteres.',
      }));
    } else {
      setErrors(prev => ({ ...prev, descripcion: '' }));
    }
  }, [descripcion, nombre]);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setLoading(true);
        try {
          const { status, dataResponse } = await getData(
            `${RUTA_API}/api/categorias/${id}`,
          );
          if (status >= 200 && status < 300) {
            setCategoria(dataResponse);
            setNombre(dataResponse.nombre || '');
            setDescripcion(dataResponse.descripcion || '');
            setImagen(dataResponse.imagen || null);
          } else {
            toast.error('No se encontraron los recursos (404)');
          }
        } catch (err) {
          toast.error('No se ha podido traer la categoría');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [isOpen, id]);

  const handleUpdate = async () => {
    if (errors.nombre || errors.descripcion || errors.imagen) {
      return; // No enviar el formulario si hay errores
    }
    setEnviando(true); // Deshabilitar el botón y mostrar el spinner

    const updatedCategoria = {
      nombre,
      descripcion,
      imagen,
    };

    try {
      const response = await putData(
        `${RUTA_API}/api/categorias/${id}`,
        updatedCategoria,
      );
      console.log('Categoria actualizada:', response);
      toast.success('Categoría actualizada con éxito');
      onClose(); // Close the modal after updating
    } catch (error) {
      toast.error('Error actualizando la categoría');
      console.error('Error updating category:', error);
    }
    setEnviando(false); // Deshabilitar el botón y mostrar el spinner
  };

  const handleFileChange = async event => {
    const files = event.target.files;
    if (files.length > 0) {
      const formDataToSend = new FormData();
      for (const file of files) {
        formDataToSend.append('files', file); // Cambia 'file' por 'files'
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
        setImagen(imageData.files[0]); // Ajusta esta línea según el formato de respuesta del servidor
      } catch (error) {
        toast.error('Error subiendo la imagen');
        console.error('Error uploading image:', error);
      }
    }
  };
  return (
    <>
      <Tooltip content='Editar Categoría'>
        <span
          className='text-lg text-default-400 cursor-pointer active:opacity-50'
          onClick={onOpen}
        >
          <EditIcon />
        </span>
      </Tooltip>

      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalHeader>
            <h3>Editar Categoría</h3>
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <div className='flex justify-center items-center h-40'>
                <CircularProgress />
              </div>
            ) : (
              <>
                <label
                  className='w-80 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md mt-4 m-auto'
                  htmlFor='file'
                >
                  <img src={imagenloader} alt='icono' width={100} />
                  <span className='font-normal text-gray-700'>
                    Haz clic para subir una imagen
                  </span>
                  <input
                    type='file'
                    id='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                  {imagen && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Imagen Actual
                      </label>
                      <div className='relative mt-2'>
                        <Image
                          src={imagen ? `${imagen}` : imagen}
                          alt='Imagen Actual'
                          width={100}
                          height={100}
                          className='object-cover rounded-md'
                        />
                      </div>
                    </div>
                  )}
                </label>

                <Input
                  isInvalid={!!errors.nombre}
                  color={errors.nombre ? 'danger' : ''}
                  errorMessage={errors.nombre}
                  className='w-full mt-4'
                  clearable
                  label='Nombre'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />

                <Textarea
                  isInvalid={!!errors.descripcion}
                  color={errors.descripcion ? 'danger' : ''}
                  errorMessage={errors.descripcion}
                  className='w-full mt-4'
                  label='Descripción'
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  rows={4}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
            <Button auto flat color='error' onClick={onClose}>
              Cancelar
            </Button>
            <Button auto onClick={handleUpdate} disabled={enviando}>
              {enviando ? <Spinner size='sm' color='danger' /> : 'Enviar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
