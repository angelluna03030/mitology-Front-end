import {
  EditarImagenesParaVideo,
  EditarVideo,
  EditarGaleriaDeImagenes,
  EditarProductosDestacados,

} from './index';
import{EditarDescripcion} from "./Editardescripcion" 
export const EditarCatalogo = ({ data }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-7xl mx-auto my-5'>
      <EditarImagenesParaVideo />
      <EditarGaleriaDeImagenes />
      <EditarProductosDestacados />
      <EditarDescripcion/>
    </div>
  );
};
