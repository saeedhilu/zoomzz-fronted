// // src/components/ProtectedRoute.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   console.log('st',isAuthenticated);

//   return isAuthenticated ? <Navigate to="/" /> : <Component {...rest} />;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.js

// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, isVendor, isSuperAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      if (isVendor) {
        navigate('/vendor/dashboard');
      } else if (isSuperAdmin) {
        navigate('/super-admin-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, isVendor, isSuperAdmin, navigate]);

  // If not authenticated, render the component to proceed to the login page or other protected routes
  if (!isAuthenticated) {
    return <Component {...rest} />;
  }

  return null; // Returning null while redirection is in process
};

export default ProtectedRoute;

