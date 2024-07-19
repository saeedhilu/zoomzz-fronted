import React from "react";
import { AdminSidebar } from "../../components/layout/admin/Slidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage all the aspects of your application.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
