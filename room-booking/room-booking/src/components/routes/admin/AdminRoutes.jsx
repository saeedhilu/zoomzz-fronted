import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layout/admin/Adminlayout";
import AdminDashboard from "../../../pages/admin/Dashboard";
import Allguests from "../../../pages/admin/Allusers";
import Categories from "../../../pages/admin/CategoryPage";
import Amenity from "../../../pages/admin/AmenityPage";
import Bedtypes from "../../../pages/admin/BedType";
import RoomType from "../../../pages/admin/RoomType";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="guests" element={<Allguests />} />
        <Route path="category/" element={<Categories />} />
        <Route path="amenity/" element={<Amenity/>} />
        <Route path="bed-type/" element={<Bedtypes/>} />
        <Route path="roomtype/" element={<RoomType/>} />
       
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
