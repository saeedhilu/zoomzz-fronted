import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorLayout from "../../layout/SidebarItems";
import Dashboard from "../../../pages/vendor/Dashboard";
import AllUsers from "../../../pages/vendor/AllUsers";
import AllRooms from "../../../pages/vendor/AllRooomsPage";
import Reviews from "../../../pages/vendor/Reviews";
// import LogoutPage from "../../../pages/Vendor/LogoutPage";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<VendorLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="guests" element={<AllUsers />} />
        <Route path="rooms" element={<AllRooms />} />
        <Route path="reviews" element={<Reviews />} />
        {/* <Route path="logout" element={<LogoutPage />} />     */}
      </Route>
    </Routes>
  );
};

export default VendorRoutes;
