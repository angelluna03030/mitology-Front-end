import { Link } from 'react-router-dom';

export const Layout = () => {
  return (
    <nav className='w-screen bg-colorprimary h-fit overflow-hidden'>
      <div className='py-2 lg:px-8 px-4 max-w-[1280px] h-20 m-auto text-white flex items-center justify-center'>
        <div className='m-auto'>
          <Link to={'/'}>
            <h1 className=' text-5xl uppercase tracking-wider cursor-pointer font-bold '>
              DELUXE
            </h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};
