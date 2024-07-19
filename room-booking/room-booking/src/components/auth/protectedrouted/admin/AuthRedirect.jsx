// src/components/AuthRedirect.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, isSuperAdmin } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    if (isSuperAdmin) {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return children;
};

export default AuthRedirect;
