import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import { clearAuth } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from "../../utils/toastUtils";
const Navbar = () => {
  const websiteName = "ZOOMZZZ";
  const baseURL = "http://localhost:8000/images/";

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileImage = useSelector((state) => state.auth.profileImage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(clearAuth());
    showToast('You have successfully logged out!', 'success');
  };

  const handleSignIn = () => {
    navigate("/signin");
  };
  const handleBookingHistory = () => {
    navigate("/reservations-status");
  };

  const handleWishlist = () => {
    navigate("/user-wishlist");
  };

  const handleHost = () => {
    navigate("/host-page");
  };

  const handleProfile = () => {
    navigate("/user-profile");
  };

  const handlelogoName=()=>{
    navigate("/")
  }
  return (
    <div className="flex items-center justify-between py-6 px-4 sm:px-8 w-full z-50">
      <div>
        <h1 className="text-3xl font-bold text-gray-500 cursor-pointer" onClick={handlelogoName}>{websiteName}</h1>
      </div>
      <div className="flex items-center space-x-4">
      <button
  className="hidden md:inline-block px-4 py-2 text-sm font-semibold text-white bg-gray-500 h-12 hover:bg-gray-600 rounded-3xl cursor-pointer"
  onClick={handleHost}
>
  Become A Host
</button>

          
        <div className="flex bg-gray-500 rounded-3xl relative">
          <section
            className="text-2xl text-white p-3 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <TiThMenu />
          </section>
          <div className="p-1">
            {isAuthenticated && profileImage ? (
              <img
                src={baseURL + profileImage}
                alt="User Logo"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <VscAccount className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center" />
            )}
          </div>

          <div
            className={`absolute top-14 right-0 mt-2 w-48 rounded-lg bg-gray-100 shadow-lg py-1 transform transition-transform duration-300 z-50  ${
              showMenu
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative z-50" >
              <div
                className={`absolute right-1 w-3 h-3 bg-gray-100 z-10 transform rotate-45 -mt-2 ${
                  showMenu ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              />
              {isAuthenticated ? (
                <div className="z-20">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-white w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-white w-full text-left"
                    onClick={handleWishlist}
                  >
                    Wishlist
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-white w-full text-left"
                    onClick={handleProfile}
                  >
                    Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-white w-full text-left"
                    onClick={handleBookingHistory}
                  >
                    Booking History
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-white w-full text-left"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>
     
    </div>
  );
};

export default Navbar;
