import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ allowedRoles }) => {
  const { userRole } = useContext(AuthContext);


  if (!allowedRoles.includes(userRole)) {
    console.log('El usuario no tiene un rol permitido. Redirigiendo a la página de inicio de sesión.');
    return <Navigate to="/login" />;
  }

  console.log('El usuario tiene un rol permitido. Acceso permitido a la ruta.');
  return <Outlet />;
};

export default PrivateRoute;
