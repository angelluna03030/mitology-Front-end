import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Spinner,
} from '@nextui-org/react';
import { PlusIcon } from '../../../states/icons/PlusIcon';
import { toast } from 'react-toastify';
import imagen from '../../../assets/imagen.svg'; // Asegúrate de que esta ruta sea correcta
import { useState, useEffect } from 'react';

const RUTA_API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const CrearCategoria = () => {
  const [enviando, setEnviando] = useState(false); // Nuevo estado

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md');

  useEffect(() => {
    if (
      formData.nombre &&
      (formData.nombre.length < 5 ||
        formData.nombre.length > 15 ||
        /\d/.test(formData.nombre) ||
        /\s$/.test(formData.nombre))
    ) {
      setErrors(prev => ({
        ...prev,
        nombre:
          'El nombre debe contener entre 5 y 15 letras sin números y no debe tener espacios al final.',
      }));
    } else {
      setErrors(prev => ({ ...prev, nombre: '' }));
    }
    if (
      formData.descripcion &&
      (formData.descripcion.length < 15 || formData.descripcion.length > 100)
    ) {
      setErrors(prev => ({
        ...prev,
        descripcion: 'La descripción debe tener entre 15 y 100 caracteres.',
      }));
    } else {
      setErrors(prev => ({ ...prev, descripcion: '' }));
    }

    if (selectedFiles.length === 0) {
      setErrors(prev => ({
        ...prev,
        imagen: 'Se debe seleccionar una imagen.',
      }));
    } else {
      setErrors(prev => ({ ...prev, imagen: '' }));
    }
  }, [formData, selectedFiles]);

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(filePreviews);

    setFormData(prevFormData => ({
      ...prevFormData,
      imagen: files[0], // Solo tomamos la primera imagen
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (errors.nombre || errors.descripcion || errors.imagen) {
      return; // No enviar el formulario si hay errores
    }
    setEnviando(true); // Deshabilitar el botón y mostrar el spinner

    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('descripcion', formData.descripcion);

      // Enviar imagen al servidor con el nombre del campo 'files'
      if (formData.imagen) {
        formDataToSend.append('files', formData.imagen);
      }

      const imageResponse = await fetch(`${RUTA_API}/public`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!imageResponse.ok) {
        // Manejo de errores específico
        const errorText = await imageResponse.text();
        if (errorText === true) {
          toast.error(
            'La imagen ya se ha subido o hay un problema con la imagen.',
          );
        } else {
          toast.error('Las imágenes no se subieron correctamente.');
        }
        return;
      }

      const imageData = await imageResponse.json();
      const imageFiles = imageData.files;

      // Actualizar el estado con el nombre de la imagen subida
      setFormData(prevFormData => ({
        ...prevFormData,
        imagen: imageFiles[0], // Asumimos que sólo hay una imagen
      }));

      // Enviar información de la categoría al servidor
      const categoryResponse = await fetch(`${RUTA_API}/api/categorias`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          imagen: imageFiles[0], // Utilizar la imagen subida
        }),
      });

      if (!categoryResponse.ok) {
        throw new Error('Error al crear la categoría');
      }

      const categoryData = await categoryResponse.json();

      toast.success('Categoría creada exitosamente');
      onClose(); // Cerrar el modal al éxito
    } catch (err) {
      toast.error('Problemas al crear la categoría');
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setEnviando(false); // Deshabilitar el botón y mostrar el spinner
    }
  };

  const handleOpen = size => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className='flex flex-wrap gap-3'>
        <Button onPress={() => handleOpen('3xl')} endContent={<PlusIcon />}>
          Crear Categoría
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Crear Categoría
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                {selectedFiles.length === 0 ? (
                  <label
                    className='h-52 w-72 flex flex-col items-center justify-between gap-5 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md ml-8 mt-6 sm:ml-52'
                    htmlFor='file'
                  >
                    <div className='sm:flex sm:items-center sm:justify-center'>
                      <img src={imagen} alt='icono' width={100} />
                    </div>
                    <div className='flex items-center justify-center'>
                      <span className='font-normal text-gray-700'>
                        Haz clic para subir la imagen
                      </span>
                    </div>
                    <input
                      type='file'
                      id='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                    {errors.imagen && (
                      <p className='text-red-500'>{errors.imagen}</p>
                    )}
                  </label>
                ) : (
                  <div className='flex flex-wrap gap-4 m-5'>
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={file}
                        alt={`preview ${index}`}
                        className='h-52 w-52 object-cover rounded-2xl justify-center items-center m-auto'
                      />
                    ))}
                  </div>
                )}
                <div className='sm:flex sm:mb-5 mt-5'>
                  <Input
                    isInvalid={!!errors.nombre}
                    color={errors.nombre ? 'danger' : ''}
                    errorMessage={errors.nombre}
                    className='sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.nombre}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        nombre: e.target.value,
                      })
                    }
                    placeholder='Nombre de la categoría'
                    required
                  />
                </div>

                <Textarea
                  isInvalid={!!errors.descripcion}
                  color={errors.descripcion ? 'danger' : ''}
                  errorMessage={errors.descripcion}
                  className='sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                  value={formData.descripcion}
                  onChange={e =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  placeholder='Descripción de la categoría'
                  required
                />

                <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
                  <Button
                    color='danger'
                    variant='light'
                    onPress={onClose}
                    className=''
                  >
                    Cerrar
                  </Button>
                  <Button color='primary' type='submit' disabled={enviando}>
                    {enviando ? <Spinner size='sm' color='danger' /> : 'Enviar'}
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
