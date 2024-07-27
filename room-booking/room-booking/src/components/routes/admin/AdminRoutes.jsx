// src/components/routes/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../../pages/admin/Dashboard";
import Allguests from "../../layout/admin/Allguests";

const AdminRoutes = () => {
  return (
    <Routes>
     
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="guests" element={<Allguests />} />
    </Routes>
  );
};

export default AdminRoutes;
