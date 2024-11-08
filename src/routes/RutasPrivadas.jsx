import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const sessionExpiration = localStorage.getItem('sessionExpiration');

  if (
    !isAuthenticated ||
    !sessionExpiration ||
    new Date() > new Date(sessionExpiration)
  ) {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionExpiration');
    return <Navigate to='/sesion' replace />;
  }

  return children;
};

export default PrivateRoute;
