// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// const Sidebar = ({ title, menuItems, profile }) => {
//   if (!menuItems) return null;
//   const baseURL = "http://localhost:8000/";

//   return (
//     <aside className="h-screen w-64   fixed top-0 border-r-2 shadow-xl left-0">
//       <header className="py-4 px-6">
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <div className="flex items-center mb-6">
//           {profile.profileImage ? (
//             <img src={baseURL + profile.profileImage} alt="Profile" className="w-12 h-12 rounded-full" />
//           ) : (
//             <span className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
//               {profile.icon}
//             </span>
//           )}
//           <div className="ml-4">
//             <h3 className="text-lg">{profile.username}</h3>
//             <button className="text-sm text-blue-400 hover:underline">Edit</button>
//           </div>
//         </div>
//         <nav>
//           <ul className="space-y-4">
//             {menuItems.map((item, index) => (
//               <li key={index} className="hover:bg-gray-100 px-4 py-2 rounded-lg">
//                 <Link to={`/admin/${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
//                   <span className="flex items-center">
//                     {item.icon}
//                     <span className="ml-3">{item.label}</span>
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </header>
//     </aside>
//   );
// };

// Sidebar.propTypes = {
//   title: PropTypes.string.isRequired,
//   menuItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       icon: PropTypes.node.isRequired,
//     })
//   ).isRequired,
//   profile: PropTypes.shape({
//     profileImage: PropTypes.string,
//     icon: PropTypes.node.isRequired,
//     username: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default Sidebar;
  















// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Make sure to install @heroicons/react

// const Sidebar = ({ title, menuItems, profile }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const baseURL = "http://localhost:8000/";

//   const handleToggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   if (!menuItems) return null;

//   return (
//     <div>
//       {/* Hamburger Menu Icon for Mobile */}
//       <div className="sm:hidden fixed top-4 right-4 z-50 ">
//         <button
//           onClick={handleToggleSidebar}
//           className="p-2 bg-gray-200 rounded-full shadow-lg"
//         >
//           {isOpen ? <XIcon className="h-6 w-6 text-gray-600" /> : <MenuIcon className="h-6 w-6 text-gray-600" />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 w-64 h-screen bg-white border-r-2 shadow-xl transition-transform transform z-20  ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:relative lg:w-64 lg:h-auto lg:border-none lg:shadow-none lg:flex lg:flex-col lg:items-start `}
//       >
//         <header className="py-4 px-6">
//           <h2 className="text-xl font-semibold mb-6">{title}</h2>
//           <div className="flex items-center mb-6">
//             {profile.profileImage ? (
//               <img
//                 src={baseURL + profile.profileImage}
//                 alt="Profile"
//                 className="w-12 h-12 rounded-full"
//               />
//             ) : (
//               <span className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
//                 {profile.icon}
//               </span>
//             )}
//             <div className="ml-4">
//               <h3 className="text-lg">{profile.username}</h3>
//               <button className="text-sm text-blue-400 hover:underline">Edit</button>
//             </div>
//           </div>
//           <nav>
//             <ul className="space-y-4">
//               {menuItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="hover:bg-gray-100 px-4 py-2 rounded-lg"
//                 >
//                   <Link to={`/admin/${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
//                     <span className="flex items-center">
//                       {item.icon}
//                       <span className="ml-3">{item.label}</span>
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </header>
//       </aside>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   title: PropTypes.string.isRequired,
//   menuItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       icon: PropTypes.node.isRequired,
//     })
//   ).isRequired,
//   profile: PropTypes.shape({
//     profileImage: PropTypes.string,
//     icon: PropTypes.node.isRequired,
//     username: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default Sidebar;


import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Sidebar = ({ title, menuItems, profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const baseURL = "http://localhost:8000/";

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!menuItems) return null;

  return (
    <div>
      {/* Hamburger Menu Icon for Mobile */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={handleToggleSidebar}
          className="p-2 bg-gray-200 rounded-full shadow-lg"
        >
          {isOpen ? <XIcon className="h-6 w-6 text-gray-600" /> : <MenuIcon className="h-6 w-6 text-gray-600" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-white border-r-2 border-gray-200 shadow-xl transition-transform transform z-40 ${
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
                <li
                  key={index}
                  className="hover:bg-gray-100 px-4 py-2 rounded-lg transition duration-150 ease-in-out"
                >
                  <Link to={`/admin/${item.label.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center text-gray-700">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
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
};

export default Sidebar;
