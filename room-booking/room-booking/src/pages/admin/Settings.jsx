import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../redux/slices/authSlice';

const SettingsPage = () => {
  const { username, profileImage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/";

  const handleLogout = () => {
    dispatch(clearAuth()); // Clear authentication state
    localStorage.removeItem('authToken'); // Optionally clear the auth token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <main className="p-6 md:p-8 lg:p-10 ml-64">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>

      <section className="space-y-6">
        {/* Profile Section */}
        <article className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img 
              src={profileImage ? `${baseURL}${profileImage}` : '/default-profile.png'} 
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-700 text-xl font-semibold">{username}</p>
            </div>
          </div>
        </article>

        {/* Account Settings Section */}
        <article className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Address:</span>
              <span className="text-gray-900">user@example.com</span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Update Email</button>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Password:</span>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Change Password</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Two-Factor Authentication:</span>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Manage 2FA</button>
            </div>
            <button className="bg-red-500 text-white py-2 px-4 rounded-md">Delete Account</button>
          </div>
        </article>

        {/* Notification Settings Section */}
        <article className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <p className="text-gray-700">Configure your notification preferences here.</p>
          {/* Add notification settings options here */}
        </article>

        {/* Theme Selection Section */}
        <article className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Theme Selection</h2>
          <p className="text-gray-700">Choose your preferred theme for the application.</p>
          {/* Add theme selection options here */}
        </article>

        {/* Logout Button */}
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
};

export default SettingsPage;
