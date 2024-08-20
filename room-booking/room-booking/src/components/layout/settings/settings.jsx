import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import ProfileSection from "../../settingsParts/ProfileSection";
import ThemeSelection from "../../settingsParts/ThemeSelection";
import LogoutButton from "../../settingsParts/LogoutButton";
import '../../../style/Theme.css';
import UserProfile from "../../../profile/UserProfile";

const SharedSettingsPage = ({ role, imageUrl }) => {
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
        <UserProfile
          onClose={() => setIsModalOpen(false)}
          username={username}
          profileImage={profileImage}
          imageUrl={imageUrl}
          baseURL={baseURL}
        />
        <ThemeSelection theme={theme} handleThemeChange={handleThemeChange} />
      </section>

      <LogoutButton
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleModalConfirm={handleModalConfirm}
        handleModalCancel={handleModalCancel}
      />

      <ToastContainer />
    </main>
  );
};

export default SharedSettingsPage;
