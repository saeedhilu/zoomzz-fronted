import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../common/admin/SlidebarLi";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaUsers,
  FaList,
  FaCogs,
  FaSignOutAlt,
  FaConciergeBell,
  FaBed,
  FaCouch,
  FaCity,
  FaFlag,
  FaImage
} from "react-icons/fa"; 

const adminMenuItems = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Guests",
    icon: <FaUsers />,
  },
  {
    label: "Category",
    icon: <FaList />,
  },
  {
    label: "Amenity",
    icon: <FaConciergeBell />,
  },
  {
    label: "Room Type",
    icon: <FaCouch />,
  },
  {
    label: "Bed Type",
    icon: <FaBed />,
  },
  {
    label: "City",
    icon: <FaCity />,
  },
  {
    label: "Country",
    icon: <FaFlag />,
  },
  {
    label: "Banner",
    icon: <FaImage />,
  },
  {
    label: "Settings",
    icon: <FaCogs />,
    link: "/settings", 
  },
  {
    label: "Logout",
    icon: <FaSignOutAlt />,
    action: "logout", 
  },
];

const AdminLayout = () => {
  const profile = useSelector((state) => ({
    username: state.auth.username,
    profileImage: state.auth.profileImage,
    icon: state.auth.icon || "A", // Default icon if none provided
  }));

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  return (
    <div className="flex">
      <Sidebar
        title="Admin Panel"
        menuItems={adminMenuItems}
        profile={profile}
        onLogout={handleLogout} // Pass logout handler to Sidebar
      />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
