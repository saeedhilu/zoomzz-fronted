import React from "react";
import AdminStatics from "../../components/layout/admin/AdminStatics";
import TopVendors from "../../components/layout/admin/TopVenodors";
import BookingStatusChart from "../../components/layout/admin/BookingStatus";
import BookingChart from "../../components/layout/admin/TestChart";
import BookingChartControls from "../../components/layout/admin/TestChart";

const AdminDashboard = () => {
  return (
    <main className="flex h-screen ">
      <div className="flex-1 overflow-auto">
        <AdminStatics />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pl-4 lg:pl-10">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Chart</h2>
            <BookingChartControls apiEndpoint="/booking-sts/" />
          </div>

          <div className="col-span-1">
            <TopVendors />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <BookingStatusChart />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;

