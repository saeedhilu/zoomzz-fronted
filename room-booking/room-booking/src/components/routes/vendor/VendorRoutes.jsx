import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorLayout from "../../layout/SidebarItems";
import Dashboard from "../../../pages/vendor/Dashboard";
import AllUsers from "../../../pages/vendor/AllUsers";
import AllRooms from "../../../pages/vendor/AllRooomsPage";
import ReviewsPage from "../../../pages/vendor/Reviews";
import SettingsPages from "../../../pages/vendor/SettingsPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecentBooking from "../../../pages/vendor/Bookings";
const VendorRoutes = () => {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<VendorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="guests" element={<AllUsers />} />
          <Route path="bookings" element={<RecentBooking />} />
          <Route path="rooms" element={<AllRooms />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="settings" element={<SettingsPages />} /> 
        </Route>
      </Routes>
    </>
  );
};

export default VendorRoutes;
