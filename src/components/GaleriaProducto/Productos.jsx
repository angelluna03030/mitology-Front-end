import React from 'react';

export const Productos = ({ alt, src }) => {
  return (
    <div>
      <img className='rounded-md' width={550} src={src} alt={alt} />
    </div>
  );
};
