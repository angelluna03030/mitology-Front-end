import React from 'react';

export const TablaVaciaImagen = ({ busqueda}) => (
  <div
    style={{
      textAlign: 'center',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >

    <p className=''>No hay nada por ahora de <span className='font-bold '>{busqueda}</span> </p>
  </div>
);
