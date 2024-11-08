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
import { Colores } from './DataColores';

export const ModalColores = ({ selectedColores, onColoresChange }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [coloresSelect, setColoresSelect] = useState(selectedColores);

  const handleCheckboxChange = selected => {
    setColoresSelect(selected);
    onColoresChange(selected);
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Colores
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='4xl'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Colores</ModalHeader>
          <ModalBody>
            <CheckboxGroup
              value={coloresSelect}
              onChange={handleCheckboxChange}
            >
              <div className='grid sm:grid-cols-6 sm:gap-10 grid-cols-3 gap-2'>
                {Colores.map((color, index) => (
                  <label
                    key={index}
                    className='flex flex-col items-center border-2 border-gray-300 px-3 pt-3 rounded-2xl'
                  >
                    <div className='flex'>
                      <div
                        className='w-8 h-8 rounded-full'
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <Checkbox className='ml-5' value={color.color} />
                    </div>
                    <span>{color.label}</span>
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
                onColoresChange(coloresSelect);
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
