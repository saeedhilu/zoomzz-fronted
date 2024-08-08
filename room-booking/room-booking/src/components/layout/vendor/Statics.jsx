import { useEffect, useState } from "react";
import StatisticsCard from "../../common/StaticsCard";
import getSummaryStatics from "../../../services/vendor/VendorStatics";
import { FaBookmark, FaUserTie } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { SiCashapp } from "react-icons/si";

const VendorStatics = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
      try {
        const response = await getSummaryStatics();
        console.log('response for get vendor statics ,,,',response);
        
        setData(response.summary);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const { total_earnings,total_bookings, total_check_ins, total_check_outs } = data;
    
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 p-2">
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
        icon={() => <IoLogOut className="rotate-180" size={40} />} 
      />
      <StatisticsCard
        value={total_earnings}
        label="Total Earning"
        icon={SiCashapp }
      />
      </div>
    
    );
  };
export default VendorStatics;