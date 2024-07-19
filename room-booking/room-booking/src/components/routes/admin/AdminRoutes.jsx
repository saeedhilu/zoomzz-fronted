// src/components/routes/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../../pages/admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
     
      <Route path="dashboard/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
