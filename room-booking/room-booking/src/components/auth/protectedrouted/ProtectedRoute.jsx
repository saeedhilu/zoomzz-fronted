// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('st',isAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : <Component {...rest} />;
};

export default ProtectedRoute;
