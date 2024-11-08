import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
} from '@nextui-org/react';
import { Tallas } from './DataTallas';

export const ModalTallas = ({
  selectedTalla: initialTalla,
  onTallasChange,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedTallas, setSelectedTallas] = useState(initialTalla);

  const handleCheckboxChange = selected => {
    setSelectedTallas(selected);
    onTallasChange(selected);
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Tallas
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='4xl'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Tallas</ModalHeader>
          <ModalBody>
            <CheckboxGroup
              value={selectedTallas}
              onChange={handleCheckboxChange}
            >
              <div className='grid sm:grid-cols-6 sm:gap-10 grid-cols-3 gap-2'>
                {Tallas.map((talla, index) => (
                  <label
                    key={index}
                    className='flex flex-col items-center border-2 border-gray-300 px-3 pt-3 rounded-2xl'
                  >
                    <div className='flex py-4'>
                      <Checkbox className='' value={talla.Tallas} />
                      <span>{talla.Tallas}</span>
                    </div>
                  </label>
                ))}
              </div>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button
              color='primary'
              onPress={() => {
                onTallasChange(selectedTallas);
                onClose();
              }}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
