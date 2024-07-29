import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layout/admin/Adminlayout";
import AdminDashboard from "../../../pages/admin/Dashboard";
import Allguests from "../../../pages/admin/Allusers";
import Categories from "../../../pages/admin/CategoryPage";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="guests" element={<Allguests />} />
        <Route path="category/" element={<Categories />} />
       
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
