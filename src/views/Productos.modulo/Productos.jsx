import { Navegacion } from '../../components/Nav';
import { TablaProductos } from './components/TablaProducto';

export const Productos = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <Navegacion />
      <div className='w-full mt-6 flex justify-center'>
        <div className='sm:w-full sm:max-w-6xl sm:mr-32'>
          <TablaProductos />
        </div>
      </div>
    </div>
  );
};
