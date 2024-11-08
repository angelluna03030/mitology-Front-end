import { useState, useMemo } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import { PlusIcon } from '../../../states/icons/PlusIcon';
import { toast } from 'react-toastify';
import imagen from '../../../assets/imagen.svg'; // Asegúrate de que esta ruta sea correcta
import { ModalColores } from './ModalColores';
import { ModalTallas } from './ModalTallas';
import { ModalCategoria } from './ModalCategoria';
import { postData } from '../../../config/utils/metodoFecht';
import { InputForm } from '../../../components/Inputs/InputForm';
const RUTA_API = import.meta.env.VITE_API_URL;
export const ModalCrearProductos = () => {
  const [errors, setErrors] = useState({
    nombreproductos: '',
    precio: '',
    descripcion: '',
    tallas: '',
    colores: '',
    imagenes: '',
    categorias: '',
  });
  const [formData, setFormData] = useState({
    nombreproductos: '',
    estado: 1,
    precio: 0,
    descripcion: '',
    tallas: [],
    colores: [],
    imagenes: [],
    categorias: [],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [enviando, setEnviando] = useState(false); // Nuevo estado

  const validateRequiredFields = () => {
    const newErrors = {};
    if (formData.tallas.length === 0) {
      newErrors.tallas = 'Debe seleccionar al menos una talla.';
    }
    if (formData.colores.length === 0) {
      newErrors.colores = 'Debe seleccionar al menos un color.';
    }
    if (formData.imagenes.length === 0) {
      newErrors.imagenes = 'Debe subir al menos una imagen.';
    }
    if (formData.categorias.length === 0) {
      newErrors.categorias = 'Debe seleccionar al menos una categoría.';
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      ...newErrors,
    }));
    return Object.keys(newErrors).length === 0;
  };

  const validateNombre = value => /^[a-zA-Z\s]{5,15}$/.test(value);
  const validatePrecio = value =>
    /^\d+$/.test(value) && parseFloat(value) <= 1000000;
  const validateDescripcion = value => /^.{15,100}$/.test(value);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validaciones en tiempo real
    if (name === 'nombreproductos') {
      setErrors(prev => ({
        ...prev,
        nombreproductos: validateNombre(value)
          ? ''
          : 'El valor debe contener entre 5 y 15 letras sin números.',
      }));
    } else if (name === 'precio') {
      setErrors(prev => ({
        ...prev,
        precio: validatePrecio(value)
          ? ''
          : 'El precio debe ser numérico y no superar el millón.',
      }));
    } else if (name === 'descripcion') {
      setErrors(prev => ({
        ...prev,
        descripcion: validateDescripcion(value)
          ? ''
          : 'La descripción debe tener entre 15 y 100 caracteres.',
      }));
    }
  };

  const handleCategoriasChange = selectedCategorias => {
    setFormData(prevFormData => ({
      ...prevFormData,
      categorias: selectedCategorias,
    }));
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(filePreviews);

    setFormData(prevFormData => ({
      ...prevFormData,
      imagenes: files,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Verificar los campos requeridos
    if (!validateRequiredFields()) {
      toast.error('Por favor complete todos los campos requeridos.');
      return;
    }
    setEnviando(true); // Deshabilitar el botón y mostrar el spinner

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombreproductos', formData.nombreproductos);
      formDataToSend.append('estado', formData.estado);
      formDataToSend.append('precio', formData.precio);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('categorias', formData.categorias);
      formData.tallas.forEach(talla => formDataToSend.append('tallas', talla));
      formData.colores.forEach(color =>
        formDataToSend.append('colores', color),
      );

      // Enviar imágenes al servidor con el nombre del campo 'files'
      formData.imagenes.forEach(file => formDataToSend.append('files', file));

      const response = await fetch(`${RUTA_API}/public`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        // Manejo de errores específico
        const errorText = await response.text();
        if (errorText === true) {
          toast.error(
            'La imagen ya se ha subido o hay un problema con la imagen.',
          );
        } else {
          toast.error('Las imágenes no se subieron correctamente.');
        }
        return;
      }
      const imageData = await response.json();
      const imageFiles = imageData.files;

      // Actualizar el estado con los nombres de las imágenes
      setFormData(prevFormData => ({
        ...prevFormData,
        imagenes: imageFiles,
      }));

      // Enviar información del producto al servidor
      try {
        const productResponse = await postData(`${RUTA_API}/api/productos`, {
          ...formData,
          imagenes: imageFiles,
        });

        if (productResponse.status >= 200 && productResponse.status < 300) {
          toast.success('Producto registrado exitosamente');
          onClose(); // Cerrar el modal al éxito
        } else {
          toast.warn(
            productResponse.dataResponse.mensaje ||
              'Error al registrar el producto',
          );
        }
      } catch (err) {
        toast.error('Problemas al registrar el producto');
        console.error(err);
      }
    } catch (err) {
      toast.error('Problemas al registrar el producto');
      console.error(err);
    }
    setEnviando(false); // Rehabilitar el botón una vez finalizado el proceso
  };

  const handleOpen = size => {
    setSize(size);
    onOpen();
  };

  const handleColoresChange = selectedColores => {
    setFormData(prevFormData => ({
      ...prevFormData,
      colores: selectedColores,
    }));
  };

  const handletallasChange = selectedTallas => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tallas: selectedTallas,
    }));
  };
  return (
    <>
      <div className='flex flex-wrap gap-3'>
        <Button onPress={() => handleOpen('3xl')} endContent={<PlusIcon />}>
          Crear Producto
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Crear Producto
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <div className='sm:flex sm:mb-5'>
                  <InputForm
                    name='nombreproductos'
                    label='Nombre del producto'
                    isInvalid={!!errors.nombreproductos}
                    messajeError={errors.nombreproductos}
                    tipo='text'
                    placeholder='Nombre del producto'
                    estilos='sm:ml-5 sm:mr-5 mb-2 flex w-full flex-wrap md:flex-nowrap gap-4'
                    value={formData.nombreproductos}
                    onChange={handleInputChange}
                  />
                  <InputForm
                    name='precio'
                    label='Precio del producto'
                    isInvalid={!!errors.precio}
                    messajeError={errors.precio}
                    tipo='number'
                    placeholder='Precio del producto'
                    estilos='sm:ml-5 sm:mr-5 mb-2 flex w-full flex-wrap md:flex-nowrap gap-4'
                    value={formData.precio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='sm:flex sm:mb-5'>
                  <Textarea
                    name='descripcion'
                    className='sm:ml-5 sm:mr-5 mb-2 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder='Descripcion del producto'
                    variant='bordered'
                    label='Descripción'
                    errorMessage={errors.descripcion}
                    isInvalid={!!errors.descripcion}
                  />
                </div>
                <div className='sm:flex sm:mb-5 mx-5 mb-2'>
                  <div className='sm:flex'>
                    <div className='sm:mt-5 flex '>
                      <ModalCategoria
                        selectedCategoria={formData.categorias}
                        onCategoriasChange={handleCategoriasChange}
                      />
                      <div className='flex flex-wrap gap-2  sm:ml-5 ml-5'>
                        {formData.categorias.map((categoria, index) => (
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
                  </div>
                </div>
                <div className='sm:flex sm:mb-5 mx-5'>
                  <div className='sm:flex'>
                    <div className='sm:mt-5 flex mr-10 sm:mb-0 mb-1'>
                      <ModalColores
                        selectedColores={formData.colores}
                        onColoresChange={handleColoresChange}
                      />
                      <div className='flex flex-wrap gap-2  sm:ml-5 ml-5 '>
                        {formData.colores.map((color, index) => (
                          <div
                            key={index}
                            className='w-8 h-8 rounded-full'
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      {errors.colores && (
                        <p className='text-red-500'>{errors.colores}</p>
                      )}
                    </div>
                    <div className='sm:mt-5 flex sm:ml-16'>
                      <ModalTallas
                        selectedTalla={formData.tallas}
                        onTallasChange={handletallasChange}
                      />
                      <div className='flex flex-wrap gap-2  sm:ml-5 ml-5  '>
                        {formData.tallas.map((tallas, index) => (
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
                  </div>
                </div>

                <div className='flex w-full flex-wrap md:flex-nowrap gap-4 '></div>
                {selectedFiles.length === 0 ? (
                  <label
                    className='h-52 w-72 m-auto flex flex-col items-center justify-between gap-5 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md ml-8 mt-6 sm:ml-52 '
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
                      multiple
                      accept='image/*'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                    {errors.imagenes && (
                      <p className='text-red-500'>{errors.imagenes}</p>
                    )}
                  </label>
                ) : (
                  <div className='flex flex-wrap gap-4 m-5'>
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={file}
                        alt={`preview ${index}`}
                        className='sm:h-40 sm:w-40 object-cover rounded-2xl h-10 w-10'
                      />
                    ))}
                  </div>
                )}
                <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
                  <Button
                    color='danger'
                    variant='light'
                    onPress={onClose}
                    className=''
                  >
                    Cerrar
                  </Button>
                  <Button
                    color='primary'
                    type='submit'
                    className='ursor-not-allowed'
                    disabled={enviando}
                  >
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
