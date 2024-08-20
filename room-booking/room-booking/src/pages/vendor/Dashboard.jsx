
import VendorStatics from "../../components/layout/vendor/Statics";
import BookingChartControls from "../../components/layout/admin/TestChart";
import VendorTopRooms from "../../components/layout/vendor/TopVendorRooms";

const Dashboard = () => {
  return (
    <main>
      <VendorStatics />

      <BookingChartControls apiEndpoint="vendor/vendor-booking-sts/" />
      <div className="p-6 grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        <VendorTopRooms />
        {/* <section>
          <h2 className="text-lg font-bold mb-4">Vendor Dashboard</h2>
        </section> */}
      </div>

    </main>
  );
};
export default Dashboard;
