import React from 'react';
import {
  Chip,
  Pagination,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react';
import Grid from '@mui/material/Grid';
import ModalComponent from '../../../components/Modal';
import EditarProducto from './EditarProducto';
import DetalleProducto from './DetalleProducto';
import ContenidoSuperior from './ContenidoSuperior';

const Targetas = ({
  items,
  handleCloseModalEditar,
  handleCloseModalDetalle,
  handleChipClick,
  setData,
  filterValue,
  onClear,
  onSearchChange,
  statusFilter,
  handleStatusFilterChange,
  handleCloseModalRegistrar,
  modalRegistrar,
  dataLength,
  onRowsPerPageChange,
  statusColorMap,
  statusOptions,
  page,
  pages,
  rowsPerPage,
  setPage,
}) => {
  // Calcular el índice inicial y final de los elementos en la página actual
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;

  return (
    <div>
      <ContenidoSuperior
        filterValue={filterValue}
        onClear={onClear}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        handleStatusFilterChange={handleStatusFilterChange}
        handleCloseModalRegistrar={handleCloseModalRegistrar}
        modalRegistrar={modalRegistrar}
        setData={setData}
        dataLength={dataLength}
        onRowsPerPageChange={onRowsPerPageChange}
        statusOptions={statusOptions}
      />
      <div>
        {items.slice(startIndex, endIndex).map((item, index) => (
          <div className='my-2'>
            <Card key={item.id_producto}>
              <CardHeader className='flex gap-3'>
                <div className='flex flex-col'>
                  <p className='text-small text-default-500'>
                    Id de producto: {item.id_producto}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <Grid container>
                  <Grid item xs={8}>
                    <p>{item.nombre_producto}</p>
                  </Grid>
                  <Grid item xs={4}>
                    {item.estado_producto === 2 ? (
                      <Chip
                        className='capitalize'
                        color={statusColorMap['agotado']}
                        size='sm'
                        variant='flat'
                        onClick={() => handleChipClick(item.id_producto)}
                        style={{ cursor: 'pointer' }}
                        isDisabled
                      >
                        Sin existencias
                      </Chip>
                    ) : (
                      <Chip
                        className='capitalize'
                        color={
                          statusColorMap[
                            item.estado_producto === 1 ? 'activo' : 'inactivo'
                          ]
                        }
                        size='sm'
                        variant='flat'
                        onClick={() => handleChipClick(item.id_producto)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.estado_producto === 1 ? 'Activo' : 'Inactivo'}
                      </Chip>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <p className='text-sm'>Marca: {item.marca}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p className='text-sm'>Precio: {item.precio}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <p className='text-base'>
                      Categoría: {item.categoria.nombre_categoria}
                    </p>
                  </Grid>
                </Grid>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className='flex w-full justify-around'>
                  <ModalComponent
                    titulo='Editar categoría'
                    size='md'
                    onClose={handleCloseModalEditar}
                    iconBoton='edit'
                    botonColor='secundary'
                    color='#338EF0'
                    isDisabled={item.estado_producto == 0}
                  >
                    <EditarProducto
                      id={item.id_producto}
                      closeModal={handleCloseModalEditar}
                      setData={setData}
                    />
                  </ModalComponent>

                  <ModalComponent
                    titulo='Detalle de producto'
                    size='lg'
                    onClose={handleCloseModalDetalle}
                    iconBoton='visibility'
                    botonColor='#00000000'
                    color='#AAAAAA'
                  >
                    <DetalleProducto id={item.id_producto} />
                  </ModalComponent>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className='py-2 px-2 flex justify-center items-center'>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default Targetas;
