import { SearchIcon } from './SearchIcon';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Buscador = () => {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState('');

  const handleChangeInput = e => setConsulta(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (consulta.trim() !== '') {
      navigate(`/productos/buscar/${consulta}`);
    }
  };
  const onClear = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <Input
        isClearable
        className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto mt-4 mb-4'
        placeholder='Buscar por Nombre o Categorias'
        startContent={<SearchIcon />}
        value={consulta}
        onChange={handleChangeInput}
        onClear={onClear}
      />
    </form>
  );
};
