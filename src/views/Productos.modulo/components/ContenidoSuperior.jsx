// TopContent.jsx
import React from 'react';
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import Icon from '@mui/material/Icon';

import ModalComponent from '../../../components/Modal';
import RegistrarProducto from './RegistrarProducto.jsx';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ContenidoSuperior = ({
  filterValue,
  onClear,
  onSearchChange,
  statusFilter,
  handleStatusFilterChange,
  handleCloseModalRegistrar,
  modalRegistrar,
  setData,
  dataLength,
  onRowsPerPageChange,
  statusOptions,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-3 items-end'>
        <Input
          isClearable
          className='w-full sm:max-w-[44%]'
          placeholder='Buscar producto'
          startContent={<Icon>search</Icon>}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className='flex gap-3'>
          <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button endContent={<Icon>arrow_drop_down</Icon>} variant='flat'>
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode='multiple'
              onSelectionChange={handleStatusFilterChange}
            >
              {statusOptions.map(status => (
                <DropdownItem key={status.uid} className='capitalize'>
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <ModalComponent
            titulo='Registrar producto'
            size='lg'
            useGlobalState={true}
            tituloBoton='Nuevo producto'
            iconBoton='add'
            color='#FFFFFF'
            botonColor='primary'
            open={modalRegistrar}
            onClose={handleCloseModalRegistrar}
          >
            <RegistrarProducto
              onSuccess={handleCloseModalRegistrar}
              setData={setData}
            />
          </ModalComponent>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-default-400 text-small'>
          Total {dataLength} productos
        </span>
        <label className='flex items-center text-default-400 text-small'>
          Filas por página:
          <select
            className='bg-transparent outline-none text-default-400 text-small'
            onChange={onRowsPerPageChange}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ContenidoSuperior;
