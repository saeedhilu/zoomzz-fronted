// src/layout/UserLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
