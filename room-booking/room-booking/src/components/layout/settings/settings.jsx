import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import ConfirmationModal from "../../common/admin/ConfirmModal";
import '../../../style/Theme.css';

const SharedSettingsPage = ({ role }) => {
  const { username, profileImage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("authToken");
    toast.success("You have successfully logged out!");
    navigate(role === 'admin' ? "/admin/login" : "/signin");
  };

  const handleModalConfirm = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <main className="p-6 md:p-8 lg:p-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>

      <section className="space-y-6">
        {/* Profile Section */}
        <article className="shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={
                profileImage
                  ? `${baseURL}${profileImage}`
                  : "/default-profile.png"
              }
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-700 text-xl font-semibold">{username}</p>
            </div>
          </div>
        </article>

        {/* Theme Selection Section */}
        <article className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Theme Selection</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`py-2 px-4 rounded-md ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              Dark
            </button>
          </div>
        </article>
      </section>

      {/* Logout Button */}
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8 mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}

      <ToastContainer />
    </main>
  );
};

export default SharedSettingsPage;
