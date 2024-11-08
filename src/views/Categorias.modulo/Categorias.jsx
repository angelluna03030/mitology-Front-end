import { Navegacion } from '../../components/Nav';

import { TablaCategoria } from './components/TablaCategoria';
export const Categorias = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <Navegacion />
        <div className='w-full mt-6 flex justify-center'>
          <div className='sm:w-full sm:max-w-6xl sm:mr-32'>
            <TablaCategoria />
          </div>
        </div>
      </div>
    </>
  );
};
