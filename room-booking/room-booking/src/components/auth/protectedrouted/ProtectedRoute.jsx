import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, isVendor, isSuperAdmin } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Handle redirection if the user is authenticated
    if (isAuthenticated) {
      if (isVendor) {
        navigate("/vendor/dashboard");
      } else if (isSuperAdmin) {
        navigate("/super-admin-dashboard");
      } else {
        const fromPath = location.state?.from || "/";
        console.log('====================================');
        console.log('pathonis :',fromPath);
        console.log('====================================');
        navigate(fromPath);
      }
    }
  }, [isAuthenticated, isVendor, isSuperAdmin, navigate, location.state]);

  // If not authenticated, render the component
  if (!isAuthenticated) {
    return <Component {...rest} />;
  }

  return null;
};

export default ProtectedRoute;
