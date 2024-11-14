import { Link } from 'react-router-dom';

export const Layout = () => {
  return (
    <nav className='w-screen bg-[#000000] h-fit overflow-hidden' id='princi'>
      <div className='py-2   h-10  text-white flex items-end justify-end  w-full'>
        <div className=' overflow-hidden whitespace-nowrap  w-full '>
          <Link to={'/'}>
            <h1 className='text-2xl  tracking-wider cursor-pointer font-semibold animate-marquee w-full ml-96'>
            
              ENVIO GRATIS por compras superiores a  <span className='text-stroke-red-700  ml-1 mr-32' > $180.000</span> &nbsp;&nbsp;&nbsp;
              ENVIO GRATIS por compras superiores a  <span className='text-stroke-red-700 ml-1 mr-32'> $180.000</span> &nbsp;&nbsp;&nbsp;
              ENVIO GRATIS por compras superiores a  <span className='text-stroke-red-700 ml-1 mr-32'> $180.000</span>
            </h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};
