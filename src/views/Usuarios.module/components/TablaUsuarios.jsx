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
  Pagination,
} from '@nextui-org/react';
import { getData } from '../../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
import { SearchIcon } from '../../../states/icons/SearchIcon';
import { DetalleUsuarios } from './DetalleUsuario';
import { CrearExcel } from './CrearExcel';

const capitalize = str => {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const RUTA_API = import.meta.env.VITE_API_URL;

const columns = [
  { name: 'Nombres', uid: 'nombres', sortable: true },
  { name: 'Apellidos', uid: 'apellidos', sortable: true },
  { name: 'Numero De Documento', uid: 'numeroDeDocumento', sortable: true },
  { name: 'Acciones', uid: 'Acciones' },
];

const INITIAL_VISIBLE_COLUMNS = ['nombres', 'apellidos', 'numeroDeDocumento', 'Acciones'];

export const TablaUsuarios = () => {
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'nombres', direction: 'ascending' });

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const { status, dataResponse } = await getData(`${RUTA_API}/api/usuarios`);
        if (status >= 200 && status < 300) {
          setUsuarios(dataResponse);
        } else {
          toast.error('No se encontraron los recursos (404)');
        }
      } catch (err) {
        toast.error('No se ha podido traer los Usuarios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsuarios = [...usuarios];

    if (hasSearchFilter) {
      filteredUsuarios = filteredUsuarios.filter(usuario =>
        usuario.nombres.toLowerCase().includes(filterValue.toLowerCase()) ||
        usuario.apellidos.toLowerCase().includes(filterValue.toLowerCase()) 
     
  

      );
    }

    return filteredUsuarios;
  }, [usuarios, filterValue]);

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

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'nombres':
        return <div className='text-bold text-small capitalize'>{capitalize(cellValue)}</div>;
      case 'apellidos':
        return <div className='text-bold text-small capitalize'>{capitalize(cellValue)}</div>;
      case 'numeroDeDocumento':
        return <div className='text-bold text-small'>{cellValue}</div>;
      case 'Acciones':
        return (
          <div className='relative flex items-center gap-2'>
            <DetalleUsuarios item={item} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
      <div className='sm:flex sm:flex-col  ml-10 mr-10'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-[200px] sm:max-w-full sm:w-[400px]'
            placeholder='Buscar Usuarios...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          /> <CrearExcel></CrearExcel>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {usuarios.length} usuarios
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
  }, [filterValue, usuarios.length, onSearchChange]);

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
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, page, pages]);

  return (
    <Table
    className='sm:w-[1000px] w-[400px] mx-3'
      aria-label='Usuarios'
      isHeaderSticky
      bottomContent={bottomContent}
      topContent={topContent}
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No se encontraron usuarios'} items={sortedItems}>
        {item => (
          <TableRow key={item._id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
