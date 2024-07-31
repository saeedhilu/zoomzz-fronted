import React from "react";
import { AdminSidebar } from "../../components/layout/admin/Slidebar";
import AllRooms from "../../components/layout/admin/AllRooms";
import AdminStatics from "../../components/layout/admin/AdminStatics";

const AdminDashboard = () => {
  return (
    <div className="flex justify-center">
      {/* For updatimg the sidebar  */}
      {/* <AdminSidebar /> */}
      <div className="ml-64  p-6">
        <div className=" w-full">
          <AdminStatics/>
        </div>  
        <div className="mt-20">
          <AllRooms />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
