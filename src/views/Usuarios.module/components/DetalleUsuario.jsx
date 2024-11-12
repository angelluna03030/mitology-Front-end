import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Tooltip, CircularProgress } from '@nextui-org/react';
import { EyeIcon } from '../../../states/icons/EyeIcon';


export const DetalleUsuarios = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  // Abrir o cerrar el modal
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // Fetch de los datos del usuario
  useEffect(() => {
    if (item) {
      setLoading(true);
      // Simulamos una carga de datos, puedes cambiar esto por tu llamada API
      setTimeout(() => {
        setUsuario(item);  // Asigna la información del usuario recibido
        setLoading(false);
      }, 500);
    }
  }, [item]);

  if (!usuario) return null; // Si no hay datos de usuario, no renderizamos nada

  const { nombres, apellidos, numeroDeDocumento, tipoDeDocumento, correo, numeroDeCelular, direccion, barrio, ciudad, departamento } = usuario;

  return (
    <>
      <Tooltip content="Detalles">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <EyeIcon />
        </span>
      </Tooltip>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        size="lg"
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
            <h3>Detalle Usuario</h3>
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : (
              <>
              <div className='flex'>

                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Nombres"
                  value={nombres}
                />
                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Apellidos"
                  value={apellidos}
                />
              </div>
              <div className='flex'>

                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Número de Documento"
                  value={numeroDeDocumento}
                />
                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Tipo de Documento"
                  value={tipoDeDocumento}
                />
              </div>
              <div className='flex'>

                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Correo"
                  value={correo}
                />
                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Número de Celular"
                  value={numeroDeCelular}
                />
              </div>
              <div className='flex'>


                <Input
                  isDisabled
                  fullWidth
                  label="Dirección"
                  value={direccion}
                  rows={2}
                  className="w-full"
                />
                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Barrio"
                  value={barrio}
                />
              </div>
                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Ciudad"
                  value={ciudad}
                />
                <Input
                  isDisabled
                  className="w-full"
                  fullWidth
                  clearable
                  label="Departamento"
                  value={departamento}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter className="mr-72 sm:mr-0 sm:mt-5">
            <Button auto flat color="error" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
