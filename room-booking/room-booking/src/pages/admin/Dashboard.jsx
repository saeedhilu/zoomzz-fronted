import React from "react";
import { AdminSidebar } from "../../components/layout/admin/Slidebar";
import AllRooms from "../../components/layout/admin/AllRooms";
import AdminStatics from "../../components/layout/admin/AdminStatics";
import TestChart from "../../components/layout/admin/TestChart"
const AdminDashboard = () => {
  return (
    <div className="flex justify-center">
      {/* Uncomment if you want to include the sidebar */}
      {/* <AdminSidebar /> */}
      <div className="ml-64 p-6">
        <>
          <AdminStatics />
          <h2 className="text-2xl font-bold mt-20 mb-4">Chart</h2>
          <TestChart  />
          <div className="mt-20">
            <AllRooms />
          </div>
        </>
      </div>
    </div>
  );
};

export default AdminDashboard;
