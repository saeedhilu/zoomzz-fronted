import VendorStatics from "../../components/layout/vendor/Statics";
import BookingChartWithControls from "../../components/layout/admin/TestChart";
import VendorTopRooms from "../../components/layout/vendor/TopVendorRooms";
import RecentBookings from "../../components/layout/vendor/RecentBooking";

const Dashboard = () => {
  return (
    <main className="p-6">
      <VendorStatics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
        <div className="p-4 bg-white rounded shadow-lg">
          <BookingChartWithControls apiEndpoint="vendor/vendor-booking-sts/" />
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <VendorTopRooms />
        </div>
      </div>
      <RecentBookings/>
    </main>
  );
};

export default Dashboard;
