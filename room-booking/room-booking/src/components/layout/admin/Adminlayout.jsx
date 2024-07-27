import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../common/admin/SlidebarLi";
import { useSelector } from "react-redux";

const adminMenuItems = [
  "Dashboard",
  "Guests",
  "Booking",
  "Reservation",
  "Category",
  "Amenity",
  "Room Type",
  "Bed Type",
  "City",
  "Country",
  "Banner",
];

const AdminLayout = () => {
  const profile = useSelector((state) => ({
    username: state.auth.username,
    profileImage: state.auth.profileImage,
    icon: state.auth.icon || "A", // Default icon if none provided
  }));

  return (
    <div className="flex">
      <Sidebar title="Admin Panel" menuItems={adminMenuItems} profile={profile} />
      <div className="flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
