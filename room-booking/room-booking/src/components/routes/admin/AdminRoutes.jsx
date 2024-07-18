// src/components/routes/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../../../pages/admin/Login";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
    </Routes>
  );
};

export default AdminRoutes;
