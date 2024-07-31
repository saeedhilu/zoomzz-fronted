import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ title, menuItems, profile }) => {
  if (!menuItems) return null;
  const baseURL = "http://localhost:8000/";

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0">
      <header className="py-4 px-6">
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <div className="flex items-center mb-6">
          {profile.profileImage ? (
            <img src={baseURL + profile.profileImage} alt="Profile" className="w-12 h-12 rounded-full" />
          ) : (
            <span className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
              {profile.icon}
            </span>
          )}
          <div className="ml-4">
            <h3 className="text-lg">{profile.username}</h3>
            <button className="text-sm text-blue-400 hover:underline">Edit</button>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index} className="hover:bg-gray-700 px-4 py-2 rounded-lg">
                <Link to={`/admin/${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </aside>
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
};

export default Sidebar;
  