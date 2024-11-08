import React from 'react';
import EmptyImage from '../../assets/fregar.png';

export const TablaVaciaImagen = () => (
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
    <img src={EmptyImage} alt='No data available' style={{ width: '200px' }} />
    <p>No hay nada por ahora</p>
  </div>
);
