import React from "react";
import { AdminSidebar } from "../../components/layout/admin/Slidebar";
import AllRooms from "../../components/layout/admin/AllRooms";
import AdminStatics from "../../components/layout/admin/AdminStatics";
import TopVendors from "../../components/layout/admin/TopVenodors";
import BookingStatusChart from "../../components/layout/admin/BookingStatus";
import BookingChart from "../../components/layout/admin/TestChart";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Optional Sidebar */}
      {/* <AdminSidebar /> */}

      <div className="flex-1 pl-14">
        {/* AdminStatics outside the grid system */}
        <AdminStatics />

        {/* Grid system for charts and other components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pl-10">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Chart</h2>
            <BookingChart />
          </div>

          <div className="col-span-1">
            <TopVendors />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <BookingStatusChart />
        </div>

        {/* Section for other components */}
        <div className="mt-6">
          <div className="col-span-1 ">
            <AllRooms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
