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
    if (isAuthenticated) {
      if (isVendor) {
        navigate("/vendor/dashboard");
      } else if (isSuperAdmin) {
        navigate("/super-admin-dashboard");
      } else {
        navigate(location.state?.from || "/");
      }
    }
  }, [isAuthenticated, isVendor, isSuperAdmin, navigate, location.state?.from]);

  if (!isAuthenticated) {
    return <Component {...rest} />;
  }

  return null;
};

export default ProtectedRoute;
