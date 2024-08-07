import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../common/admin/SlidebarLi";

const adminMenuItems = [
  "Dashboard  ",
  "Guests",
  "Category",
  "Amenity",
  "Room Type",
  "Bed Type",
  "City",
  "Country",
  "Banner",
  "Payment",
];

export const AdminSidebar = () => {
  const profile = useSelector((state) => ({
    username: state.auth.username,
    profileImage: state.auth.profileImage,
  }));

  return <Sidebar title="Admin Panel" menuItems={adminMenuItems} profile={profile} />;
};
