import React, { useContext } from 'react';
import AuthContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRouter = (elemet, requiredRole) => {
  const { isLoggedIn, userRole, isInit } = useContext(AuthContext);

  if (!isInit) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  if (requiredRole && userRole !== requiredRole) {
    alert('권한 부족');
    return <Navigate to='/' />;
  }
  return elemet;
};

export default PrivateRouter;
