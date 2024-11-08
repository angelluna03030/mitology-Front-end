import { Navegacion } from '../../components/Nav';

import { TablaCatalogo } from './components';
export const RegistrarCatalogo = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <Navegacion />
        <div className='relative w-full mt-6 flex justify-center'>
          <div className='w-full max-w-6xl sm:mr-32'>
            <TablaCatalogo />
          </div>
        </div>
      </div>
    </>
  );
};
