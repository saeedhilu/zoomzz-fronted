import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layout/admin/Adminlayout";
import AdminDashboard from "../../../pages/admin/Dashboard";
import Allguests from "../../../pages/admin/Allusers";
import Categories from "../../../pages/admin/CategoryPage";
import Amenity from "../../../pages/admin/AmenityPage";
import Bedtypes from "../../../pages/admin/BedType";
import RoomType from "../../../pages/admin/RoomType";
import City from "../../../pages/admin/CityPage";
import Country from "../../../pages/admin/CountryPage";
import Banner from "../../../pages/admin/BannerPage";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="guests" element={<Allguests />} />
        <Route path="category/" element={<Categories />} />
        <Route path="amenity/" element={<Amenity/>} />
        <Route path="bed-type/" element={<Bedtypes/>} />
        <Route path="room-type/" element={<RoomType/>} />
        <Route path="city/" element={<City/>} />
        <Route path="country/" element={<Country/>} />
        <Route path="banner/" element={<Banner/>} />
       
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
