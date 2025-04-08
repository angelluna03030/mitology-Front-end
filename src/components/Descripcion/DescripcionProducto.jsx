export const DescripcionProducto = ({ descripcion }) => {
    return (
      <p className='ml-4 text-left leading-relaxed max-w-prose sm:w-96 w-80  text-wrap'>
        {descripcion}
      </p>
    );
  };