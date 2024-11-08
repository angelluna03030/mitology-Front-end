import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from '@nextui-org/react';
import { getData, putData } from '../../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { SearchIcon } from '../../../states/icons/SearchIcon';
import { ChevronDownIcon } from '../../../states/icons/ChevronDownIcon';
import { EditarCategoria } from './EditarCategoria';
import { CrearCategoria } from './CrearCategoria';
import { DetalleCategoria } from './DetalleCategoria';

const capitalize = str => {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const RUTA_API = import.meta.env.VITE_API_URL;

const columns = [
  { name: 'Nombre Categoria', uid: 'nombre', sortable: true },
  { name: 'Descripción', uid: 'descripcion', sortable: true },
  { name: 'estado', uid: 'estado' },

  { name: 'Acciones', uid: 'actions' },
];

const EstadoOptions = [
  { name: 'activo', uid: '1' },
  { name: 'inactivo', uid: '0' },
];

const statusColorMap = {
  1: 'success',
  0: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['nombre', 'descripcion', 'estado', 'actions'];

export const TablaCategoria = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setcategorias] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'nombre',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/categorias`,
        );
        if (status >= 200 && status < 300) {
          setcategorias(dataResponse);
        } else {
          toast.error('No se encontraron los recursos (404)');
        }
      } catch (err) {
        toast.error('No se ha podido traer los Categorias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChipClick = async id => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cambiar el estado de un categoria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const { status, dataResponse } = await putData(
            `${RUTA_API}/api/categorias/estado/${id}`,
          );
          if (status >= 200 && status < 300) {
            toast.success('Estado cambiado');
            // Actualizar los categorias después del cambio de estado
            refreshcategorias();
          } else if (status >= 400 && status < 500) {
            toast.warn(dataResponse.mensaje);
          }
        } catch (err) {
          toast.error('Hubo un error al cambiar el estado');
          console.error(err);
        }
      }
    });
  };

  const refreshcategorias = async () => {
    try {
      const { status, dataResponse } = await getData(
        `${RUTA_API}/api/categorias`,
      );
      if (status >= 200 && status < 300) {
        setcategorias(dataResponse);
      } else {
        toast.error('No se encontraron los recursos (404)');
      }
    } catch (err) {
      toast.error('No se ha podido traer los categorias');
      console.error(err);
    }
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter(column =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProducts = [...categorias];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(product =>
        product.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== EstadoOptions.length
    ) {
      filteredProducts = filteredProducts.filter(product =>
        Array.from(statusFilter).includes(product.estado.toString()),
      );
    }

    return filteredProducts;
  }, [categorias, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = useCallback(
    (item, columnKey) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case 'nombre':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-small capitalize'>
                {capitalize(cellValue)}
              </p>
            </div>
          );

        case 'descripcion':
          // Verificar si cellValue es un array antes de usar map
          if (Array.isArray(cellValue)) {
            return (
              <div className='flex flex-col'>
                {cellValue.map((categoria, index) => (
                  <p key={index} className='text-bold text-small capitalize'>
                    {capitalize(categoria)}
                  </p>
                ))}
              </div>
            );
          } else {
            return (
              <div className='flex flex-col'>
                <p className='text-bold text-small capitalize'>
                  {capitalize(cellValue)}
                </p>
              </div>
            );
          }
        case 'estado':
          return (
            <Button
              className='capitalize'
              color={statusColorMap[item.estado]}
              size='sm'
              variant='flat'
              onClick={() => handleChipClick(item._id)}
            >
              {item.estado === 1 ? 'Activo' : 'Inactivo'}
            </Button>
          );
        case 'actions':
          return (
            <div className='relative flex items-center gap-2'>
              <DetalleCategoria id={item._id} />
              <EditarCategoria id={item._id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleChipClick],
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(e => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback(value => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className='sm:flex sm:flex-col sm:gap-4 ml-10 mr-10'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-[200px] sm:max-w-full sm:w-[400px]'
            placeholder='Buscar Categoria...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          <CrearCategoria></CrearCategoria>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {categorias.length} categorias
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
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    categorias.length,
    onSearchChange,
    hasSearchFilter,
  ]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Anterios
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Siguente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      className='sm:w-[1200px] w-[400px]'
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No se encontraron categorias'}
        items={sortedItems}
      >
        {item => (
          <TableRow key={item._id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
