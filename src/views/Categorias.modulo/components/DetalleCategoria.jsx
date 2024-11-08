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
  CircularProgress,
} from '@nextui-org/react';
import { EyeIcon } from '../../../states/icons/EyeIcon';
import { getData } from '../../../config/utils/metodoFecht';
const RUTA_API = import.meta.env.VITE_API_URL;

export const DetalleCategoria = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoria, setCategoria] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenActual, setImagenActual] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [FechaCreacion, setFechaCreacion] = useState('');
  const [loading, setLoading] = useState(false); // Estado para la carga

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setLoading(true); // Inicia el indicador de carga
        try {
          const { status, dataResponse } = await getData(
            `${RUTA_API}/api/categorias/${id}`,
          );
          
          if (status >= 200 && status < 300) {
            // Suponiendo que la respuesta es un objeto
            setCategoria(dataResponse);
            setNombre(dataResponse.nombre || '');
            setDescripcion(dataResponse.descripcion || '');
            setImagenActual(dataResponse.imagen || '');
            console.log(dataResponse.imagen)
            setFechaCreacion(dataResponse.fechaCreacion || '');
          } else {
            toast.error('Error al cargar la categoría');
            console.error('Error al cargar la categoría:', status);
          }
        } catch (error) {
          toast.error('Error al cargar la categoría');
          console.error('Error cargando la categoría:', error);
        } finally {
          setLoading(false); // Finaliza el indicador de carga
        }
      };

      loadData();
    }
  }, [isOpen, id]); // Se ejecuta cuando `isOpen` o `id` cambian

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setNuevaImagen(file);
    }
  };

  return (
    <>
      <Tooltip content='Detalles'>
        <span
          className='text-lg text-default-400 cursor-pointer active:opacity-50'
          onClick={onOpen}
        >
          <EyeIcon />
        </span>
      </Tooltip>

      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
          {onClose => (
            <>
              <ModalHeader>
                <h3>Detalle Categoría</h3>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className='flex justify-center items-center h-40'>
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <label className='block text-sm font-medium text-gray-700'>
                      Imagen Actual
                    </label>
                    <div className='relative mt-2 m-auto'>
                      <Image
                        src={`${imagenActual}`}
                        alt='Imagen Actual'
                        width={200}
                        height={200}
                        className='object-cover rounded-md'
                      />
                    </div>

                    <Input
                      disabled
                      className='w-full'
                      fullWidth
                      clearable
                      label='Nombre'
                      value={nombre}
                    />

                    <Textarea
                      disabled
                      fullWidth
                      label='Descripción'
                      value={descripcion}
                      rows={4}
                      className='w-full'
                    />
                    <Input
                      disabled
                      className='w-full'
                      fullWidth
                      clearable
                      label='Fecha Creacion'
                      value={new Date(FechaCreacion).toLocaleDateString()}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter className='mr-72 sm:mr-0 sm:mt-5'>
                <Button auto flat color='error' onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
