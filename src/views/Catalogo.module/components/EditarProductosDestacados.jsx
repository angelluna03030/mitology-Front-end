import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Spinner,
} from '@nextui-org/react';
const RUTA_API = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
import { getData } from '../../../config/utils/metodoFecht';
const API_KEY = import.meta.env.VITE_API_KEY;

export const EditarProductosDestacados = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [enviando, setEnviando] = useState(false); // Nuevo estado

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/productos`,
        );

        if (status >= 200 && status < 300) {
          setProductos(dataResponse);
        } else {
          toast.error('No se encontraron los recursos (404)');
          console.error('Error al obtener los productos:', status);
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
        console.error('Error al traer el catálogo:', err);
      }
    };

    obtenerCatalogo();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  const handleCheckboxChange = productoId => {
    setProductosSeleccionados(prevSeleccionados =>
      prevSeleccionados.includes(productoId)
        ? prevSeleccionados.filter(id => id !== productoId)
        : [...prevSeleccionados, productoId],
    );
  };

  const handleEnviarProductosDestacados = async () => {
    setEnviando(true); // Deshabilitar el botón y mostrar el spinner

    try {
      const respuesta = await fetch(
        `${RUTA_API}/api/catalogo/productosdestacados`,
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
          body: JSON.stringify({ productosdestacados: productosSeleccionados }),
        },
      );

      if (respuesta.ok) {
        const data = await respuesta.json();
        toast.success('Productos destacados actualizados correctamente');
        onOpenChange(false); // Cerrar el modal después de enviar
      } else {
        toast.error('Error al actualizar productos destacados');
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor');
      console.error('Error:', error);
    }

    setEnviando(false); // Deshabilitar el botón y mostrar el spinner
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombreproductos.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <>
      <Button onPress={onOpen}>Productos Destacados</Button>
      <Modal
        scrollBehavior='inside'
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
                Productos Destacados
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder='Buscar producto'
                  value={filtro}
                  onChange={e => setFiltro(e.target.value)}
                />
                <div className='flex flex-col gap-2'>
                  {productosFiltrados.map(producto => (
                    <div key={producto._id} className='flex items-center'>
                      <Checkbox
                        isSelected={productosSeleccionados.includes(
                          producto._id,
                        )}
                        onChange={() => handleCheckboxChange(producto._id)}
                      >
                        {producto.nombreproductos}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color='primary'
                  onPress={handleEnviarProductosDestacados}
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
