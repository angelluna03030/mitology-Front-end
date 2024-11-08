import imagen_instagram from '../../assets/imagenFooter/instagram.png';
import imagen_facebook from '../../assets/imagenFooter/facebook.png';
import imagen_tiktok from '../../assets/imagenFooter/tik-tok.png';
export const Footer = () => {
  return (
    <>
      <footer className='bg-colorprimary text-black py-4 mt-auto sm:mt-10'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <span>&copy; 2024 DELUXE. Derechos resevador.</span>
          <div className='flex space-x-4'>
            <a
              href='https://www.facebook.com/oraldesigncollections'
              className='text-white hover:text-gray-400'
            >
              <img src={imagen_facebook} width={25}></img>
            </a>
            <a
              href='https://www.twitter.com'
              className='text-white hover:text-gray-400'
            >
              <img src={imagen_tiktok} width={25}></img>
            </a>
            <a
              href='https://www.instagram.com/deluxe_uniformes'
              className='text-white hover:text-gray-400'
            >
              <img src={imagen_instagram} width={25}></img>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
