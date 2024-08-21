import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Sidebar = ({ title, menuItems, profile, role }) => {
  

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const baseURL = "http://localhost:8000/";
  const navigate = useNavigate()
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (username) => {
    return username
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  if (!menuItems) return null;
  const handleEditClick = () => {
    const currentURL = location.pathname.split('/')[0]
    console.log("Current URL:", currentURL)
    navigate(`${currentURL}\settings`);        
  };

  return (
    <div className="border-r-2 shadow-lg h-[100vh] fixed shadow-white overflow-y-auto z-50">
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={handleToggleSidebar}
          className="p-2 bg-gray-200 rounded-full shadow-lg"
        >
          {isOpen ? <XIcon className="h-6 w-6 text-gray-600" /> : <MenuIcon className="h-6 w-6 text-gray-600" />}
        </button>
      </div>

      <aside
        className={`overflow-y-auto fixed top-0 left-0 w-64 h-screen bg-white border-r-2 border-gray-200 shadow-xl transition-transform transform z-40  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-64 lg:h-screen lg:border-none lg:shadow-none lg:flex lg:flex-col lg:items-start`}
      >
        <header className="py-4 px-6 overflow-hidden">
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
          <div className="flex items-center mb-6">
            {profile.profileImage ? (
              <img
                src={baseURL + profile.profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-2xl text-white">
                {getInitials(profile.username)}
              </span>
            )}
            <div className="ml-4">
              <h3 className="text-lg">{profile.username}</h3>
              <button className="text-sm text-blue-400 hover:underline" onClick={handleEditClick}>Edit</button>
            </div>
          </div>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item, index) => {
                const isActive = location.pathname.includes(
                  `/${role}/${item.label.toLowerCase().replace(/\s+/g, '-')}`
                );

                return (
                  <li
                    key={index}
                    className={`px-4 py-2 rounded-lg transition duration-150 ease-in-out ${
                      isActive ? "bg-blue-200 text-blue-700" : "hover:bg-blue-100 text-gray-700"
                    }`}
                  >
                    <Link to={`/${role}/${item.label.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  profile: PropTypes.shape({
    profileImage: PropTypes.string,
    icon: PropTypes.node.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default Sidebar;
