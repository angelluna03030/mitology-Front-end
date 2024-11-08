import { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@nextui-org/react';
import { EyeIcon } from '../../../states/icons/EyeIcon';
import { toast } from 'react-toastify';
import { getData } from '../../../config/utils/metodoFecht';

const RUTA_API = import.meta.env.VITE_API_URL;

export const DetalleProducto = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(false);

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
        size='5xl'
        backdrop='opaque'
        isOpen={isOpen}
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
                Detalle del Producto
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className='flex justify-center items-center h-40'>
                    <CircularProgress />
                  </div>
                ) : (
                  <div className='flex flex-col gap-4'>
                    <div>
                      <strong>Imágenes:</strong>
                    </div>
                    <div className='imagenes-container grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                      {producto.imagenes
                        ? producto.imagenes.map((imagen, index) => (
                            <div key={index} className='flex'>
                              <img
                                src={`${imagen}`}
                                alt={`Imagen ${index + 1}`}
                                className='sm:h-40 sm:w-40 object-cover rounded-2xl h-10 w-10'
                              />
                            </div>
                          ))
                        : null}
                    </div>

                    <div className='flex'>
                      <Input
                        label='Código'
                        value={producto.codigo}
                        readOnly
                        className='mr-2'
                        disabled={true}
                      />
                      <Input
                        label='Nombre del producto'
                        value={producto.nombreproductos}
                        className='ml-2'
                        disabled={true}
                      />
                    </div>
                    <div className='flex'>
                      <Input
                        label='Precio'
                        value={producto.precio}
                        type='number'
                        className='mr-2'
                        disabled={true}
                      />
                      <Input
                        label='Descripción'
                        value={producto.descripcion}
                        className='ml-2'
                      />
                    </div>
                    <Input
                      disabled={true}
                      label='Materiales'
                      value={
                        producto.materiales
                          ? producto.materiales.join(', ')
                          : ''
                      }
                    />

                    <div className='flex flex-wrap gap-2  sm:ml-5 ml-5 '>
                      <h2>Colores: </h2>
                      {producto.colores && producto.colores.length > 0 ? (
                        producto.colores.map((color, index) => (
                          <div
                            key={index}
                            className='w-8 h-8 rounded-full'
                            style={{ backgroundColor: color }}
                          ></div>
                        ))
                      ) : (
                        <p>No hay colores disponibles.</p>
                      )}
                    </div>
                    <div className='flex'>
                      <Input
                        disabled={true}
                        className=''
                        label='Tallas'
                        value={
                          producto.tallas ? producto.tallas.join(', ') : ''
                        }
                      />
                      <Input
                        disabled={true}
                        className='ml-2'
                        label='Fecha de creación'
                        value={new Date(
                          producto.fechaCreacion,
                        ).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                    <Input
                      disabled={true}
                      className='mr-2'
                      label='Categorías'
                      value={
                        producto.categorias
                          ? producto.categorias.join(', ')
                          : ''
                      }
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={onClose}
                  className=' mr-72 sm:mr-0'
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
