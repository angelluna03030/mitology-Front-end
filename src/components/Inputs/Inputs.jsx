import { SearchIcon } from './SearchIcon';
import { AutocompleteItem, Autocomplete } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from "../../states/context/ContextCarrito";
import { getData } from '../../config/utils/metodoFecht';

const RUTA_API = import.meta.env.VITE_API_URL;

export const Buscador = () => {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState('');
  const [items, setItems] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { carrito } = useContext(CarritoContext);

  const cantidadProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const fetchProductos = async (searchTerm = '') => {
    try {
      const url = `${RUTA_API}/api/productos/buscar/${searchTerm}`;
      const response = await getData(url);
      
      if (response.status !== 200) {
        if (response.status === 401) {
          console.error("No autorizado: Verifique sus credenciales.");
        } else {
          console.error("Error al buscar productos:", response.status);
        }
        return;
      }
      
      setItems(Array.isArray(response.dataResponse) ? response.dataResponse : []);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  useEffect(() => {
    if (consulta.trim() !== '') {
      fetchProductos(consulta);
    }
  }, [consulta]);
  const handleInputChange = (value) => {
    setConsulta(value);
    if (value.trim() !== '') {
      fetchProductos(value); // Llamar a la API solo si hay un término de búsqueda
    }
  };

  const handleSelectionChange = (item) => {
    if (item && item.value) {
      navigate(`/productos/buscar/${item.value}`);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consulta.trim()) {
      navigate(`/productos/buscar/${consulta}`);
    }
  };
  

  return (
    <>
      <div className="cursor-pointer mb-4 text-white font-semibold flex bg-transparent items-center justify-center sm:text-xl  text-xs">
       
        <Link
          to={"/"}
          className="sm:mx-8  mx-2  relative text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
        >
          INICIO
        </Link>
        <Link
          to={"/productos/buscar/camisetas"}
          className="sm:mx-8 mx-2 relative text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
        >
          CAMISETAS
        </Link>
        <Link
          to={""}
          className="sm:mx-8   mx-2 relative text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
        >
          Contacto
        </Link>
        <div onClick={toggleSearch} className='ml-2'>
          <SearchIcon />
        </div>
        {cantidadProductos > 0 && (
          <div className="bg-stroke-red-700 w-3 h-3 z-50 rounded-full relative bottom-40 left-14 sm:top-3 sm:right-8"></div>
        )}
        <Link to='/carritocompras'>
        <span className="svg-wrapper ">
          <svg

            xmlns="http://www.w3.org/2000/svg" fill="none" className="icon icon-cart-empty text-white w-8 h-8 mt-2  sm:mt-0 sm:mx-6 mb-4 sm:w-12 sm:h-12 " viewBox="0 0 30 30"><path fill="currentColor" fill-rule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path></svg>
        </span>
        </Link>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10">
            <Autocomplete
              label="Búsqueda"
              variant="bordered"
              allowsCustomValue={true}
              onSelectionChange={handleSelectionChange}
              onInputChange={handleInputChange}
              className="w-full"
            >
              {items.map((item) => (
                <AutocompleteItem key={item._id} value={item._id}>
                  {item.nombreproductos}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <button type="button" onClick={toggleSearch} className="mt-4 text-red-500">Cerrar</button>
          </form>
        </div>
      )}
    </>
  );
};
