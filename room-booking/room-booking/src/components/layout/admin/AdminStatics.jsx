import { useEffect, useState } from "react";
import getAllRooms from "../../../services/admin/AllroomsServices";
import { FaBookmark, FaUserTie } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import StatisticsCard from "../../common/StaticsCard";

const AdminStatics = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getAllRooms();
      setData(response.summary_statistics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { total_bookings, total_check_ins, total_check_outs, total_vendors } = data;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mt-10 p-2">
      <StatisticsCard
        value={total_bookings}
        label="Total Booking"
        icon={FaBookmark}
      />
      <StatisticsCard
        value={total_check_ins}
        label="Total Check In"
        icon={IoLogOut}
      />
      <StatisticsCard
        value={total_check_outs}
        label="Total Check Out"
        icon={() => <IoLogOut className="rotate-180" size={40} />} // Custom icon rotation
      />
      <StatisticsCard
        value={total_vendors}
        label="Total Vendors"
        icon={FaUserTie}
      />
    </div>
  );
};

export default AdminStatics;
