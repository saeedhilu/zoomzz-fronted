import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/admin/SlidebarLi";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaBed,
  FaStar, // Import an icon for reviews
  FaCogs
} from "react-icons/fa";

// Updated menu items for vendor
const vendorMenuItems = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Guests",
    icon: <FaUsers />,
  },
  {
    label: "Bookings",
    icon: <FaUsers />,
  },
  {
    label: "Rooms",
    icon: <FaBed />,
  },
  {
    label: "Reviews",
    icon: <FaStar />,
  },
  {
    label: "Settings",
    icon: <FaCogs />,
  },
];

const VendorLayout = () => {
  var { username, profileImage } = useSelector((state) => ({
    username: state.auth.username,
    profileImage: state.auth.profileImage,
  }));

  // Compute the icon based on the username
  const icon = username ? username.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    console.log("User logged out");
  };
  var profileImage = 'images/'+profileImage
  const profile = {
    username,
    profileImage,
    icon,
  };
  console.log('profile iamge ',profileImage);
  

  return (
    <div className="flex">
      <Sidebar
        title="Vendor Panel"
        menuItems={vendorMenuItems}
        profile={profile}
        onLogout={handleLogout}
        role="vendor"
      
      />
      <div className="flex-1 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
