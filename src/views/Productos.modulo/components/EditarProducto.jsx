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
  Spinner,
} from '@nextui-org/react';
import { EditIcon } from '../../../states/icons/EditIcon';
import { ModalTallas } from './ModalTallas';
import { ModalCategoria } from './ModalCategoria';
import { ModalColores } from './ModalColores';
import { getData, putData } from '../../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
import imagen from '../../../assets/imagen.svg';

const RUTA_API = import.meta.env.VITE_API_URL;
export const EditarProducto = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [producto, setProducto] = useState(null);
  const [selectedColores, setSelectedColores] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [nombreproductos, setNombreProductos] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false); // Nuevo estado

  const validateRequiredFields = () => {
    const newErrors = {};
    if (selectedTallas.length === 0) {
      newErrors.selectedTallas = 'Debe seleccionar al menos una talla.';
    }
    if (selectedColores.length === 0) {
      newErrors.selectedColores = 'Debe seleccionar al menos un color.';
    }
    if (imagenes.length === 0) {
      newErrors.imagenes = 'Debe subir al menos una imagen.';
    }
    if (selectedCategorias.length === 0) {
      newErrors.categorias = 'Debe seleccionar al menos una categoría.';
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      ...newErrors,
    }));
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setLoading(true);
        try {
          const { status, dataResponse } = await getData(
            `${RUTA_API}/api/productos/${id}`,
          );
          if (status >= 200 && status < 300) {
            setProducto(dataResponse);
            setNombreProductos(dataResponse.nombreproductos || '');
            setPrecio(dataResponse.precio || '');
            setDescripcion(dataResponse.descripcion || '');
            setSelectedColores(dataResponse.colores || []);
            setSelectedTallas(dataResponse.tallas || []);
            setSelectedCategorias(dataResponse.categorias || []);
            setImagenes(dataResponse.imagenes || []);
          } else {
            toast.error('No se encontraron los recursos (404)');
          }
        } catch (err) {
          toast.error('No se ha podido traer el producto');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [isOpen, id]);
  const [errors, setErrors] = useState({
    nombreproductos: '',
    precio: '',
    descripcion: '',
    tallas: '',
    colores: '',
    imagenes: '',
    categorias: '',
  });
  const validateNombre = value => /^[a-zA-Z\s]{5,15}$/.test(value);
  const validatePrecio = value => /^\d+$/.test(value) && value <= 1000000;
  const validateDescripcion = value =>
    value.length >= 15 && value.length <= 100;

  useEffect(() => {
    // Validaciones en tiempo real para cada campo
    setErrors(prev => ({
      ...prev,
      nombreproductos: validateNombre(nombreproductos)
        ? ''
        : 'El valor debe contener entre 5 y 15 letras sin números.',
      precio: validatePrecio(precio)
        ? ''
        : 'El precio debe ser numérico y no superar el millón.',
      descripcion: validateDescripcion(descripcion)
        ? ''
        : 'La descripción debe tener entre 15 y 100 caracteres.',
    }));
  }, [nombreproductos, precio, descripcion]);

  // Evento onChange con validación en tiempo real
  const handleNombreChange = e => {
    setNombreProductos(e.target.value);
  };
  const handlePrecioChange = e => {
    setPrecio(e.target.value);
  };
  const handleDescripcionChange = e => {
    setDescripcion(e.target.value);
  };

  const handleUpdate = async () => {
    if (!validateRequiredFields()) {
      toast.error('Por favor complete todos los campos requeridos.');
      return;
    }
    const updatedProduct = {
      nombreproductos,
      precio,
      descripcion,
      tallas: selectedTallas,
      colores: selectedColores,
      categorias: selectedCategorias,
      imagenes,
    };

    setEnviando(true); // Deshabilitar el botón y mostrar el spinner

    try {
      const response = await putData(
        `${RUTA_API}/api/productos/${id}`,
        updatedProduct,
      );
      console.log('Product updated:', response);
      toast.success('Producto actualizado con éxito');
      onOpenChange(false); // Close the modal after updating
    } catch (error) {
      toast.error('Error actualizando el producto');
      console.error('Error updating product:', error);
    }

    setEnviando(false); // habilitar el botón
  };

  const handleRemoveImage = image => {
    setImagenes(imagenes.filter(img => img !== image));
  };

  const handleColoresChange = colores => {
    setSelectedColores(colores);
  };

  const handleTallasChange = tallas => {
    setSelectedTallas(tallas);
  };

  const handleCategoriasChange = categorias => {
    setSelectedCategorias(categorias);
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
        const imageFiles = imageData.files;

        setImagenes(prevImagenes => [...prevImagenes, ...imageFiles]);
      } catch (error) {
        toast.error('Error subiendo las imágenes');
        console.error('Error uploading images:', error);
      }
    }
  };

  return (
    <>
      <Tooltip content='Editar Producto'>
        <span
          className='text-lg text-default-400 cursor-pointer active:opacity-50'
          onClick={onOpen}
        >
          <EditIcon />
        </span>
      </Tooltip>

      <Modal
        backdrop='opaque'
        isOpen={isOpen}
        size='2xl'
        onOpenChange={onOpenChange}
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
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Editar Producto
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className='flex justify-center items-center h-40'>
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <div className='grid grid-cols-2 gap-4'>
                      <Input
                        messajeError={errors.nombreproductos}
                        className='sm:w-60 mr-2'
                        label='Nombre del Producto'
                        isInvalid={!!errors.nombreproductos}
                        errorMessage={errors.nombreproductos}
                        value={nombreproductos}
                        onChange={handleNombreChange}
                      />
                      <Input
                        className='sm:w-60 ml-2'
                        label='Precio'
                        messajeError={errors.precio}
                        type='number'
                        isInvalid={!!errors.precio}
                        errorMessage={errors.precio}
                        value={precio}
                        onChange={handlePrecioChange}
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'></div>

                    <Textarea
                      className='w-60 sm:w-full'
                      label='Descripción'
                      value={descripcion}
                      isInvalid={!!errors.descripcion}
                      errorMessage={errors.descripcion}
                      onChange={handleDescripcionChange}
                      rows={4}
                    />

                    <div className='mt-2 flex'>
                      <ModalCategoria
                        selectedCategorias={selectedCategorias}
                        onCategoriasChange={handleCategoriasChange}
                      />
                      <div className='flex flex-wrap gap-2  sm:ml-5 ml-5'>
                        {selectedCategorias.map((categoria, index) => (
                          <div
                            key={index}
                            className='w-28 h-10 mr-6 bg-gray-300 rounded-xl flex items-center justify-center'
                          >
                            {categoria}
                          </div>
                        ))}
                        {errors.categorias && (
                          <p className='text-red-500'>{errors.categorias}</p>
                        )}
                      </div>
                    </div>
                    <div className=' flex'>
                      <ModalColores
                        selectedColores={selectedColores}
                        onColoresChange={handleColoresChange}
                      />
                      <div className='flex flex-wrap gap-2  sm:ml-5 ml-5 '>
                        {selectedColores.map((color, index) => (
                          <div
                            key={index}
                            className='w-8 h-8 rounded-full'
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      <ModalTallas
                        selectedTallas={selectedTallas}
                        onTallasChange={handleTallasChange}
                      />
                      <div className='flex flex-wrap gap-2  sm:ml-5 ml-3  '>
                        {selectedTallas.map((tallas, index) => (
                          <div key={index} className='w-8 h-8 rounded-full'>
                            {' '}
                            {tallas}
                          </div>
                        ))}
                        {errors.tallas && (
                          <p className='text-red-500'>{errors.tallas}</p>
                        )}
                      </div>
                    </div>

                    <div className='mt-2'>
                      <label>Imágenes</label>
                      <div className='imagenes-container grid sm:grid-cols-9 grid-cols-6 gap-4'>
                        {imagenes &&
                          imagenes.map((img, index) => (
                            <div key={index} className='relative'>
                              <img
                                src={`${img}`}
                                alt={`Imagen ${index}`}
                                className='h-20 w-20 object-cover rounded-2xl'
                              />
                              <button
                                className='absolute top-0  right-0  bg-red-500 text-white h-8 w-8 rounded-full flex items-center justify-center'
                                onClick={() => handleRemoveImage(img)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                      </div>
                      <label
                        className='h-40 w-56 flex flex-col items-center justify-between gap-5 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md mx-auto mt-6 sm:ml-52 '
                        htmlFor='file'
                      >
                        <div className='sm:flex sm:items-center sm:justify-center'>
                          <img src={imagen} alt='icono' width={50} />
                        </div>
                        <div className='flex items-center justify-center'>
                          <span className='font-normal text-gray-700'>
                            Haz clic para subir la imagen
                          </span>
                        </div>
                        <input
                          type='file'
                          id='file'
                          multiple
                          accept='image/*'
                          onChange={handleFileChange}
                          className='hidden'
                        />
                      </label>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color='primary'
                  onPress={handleUpdate}
                  className='w-44'
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
