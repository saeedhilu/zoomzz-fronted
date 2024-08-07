// import { useEffect, useState } from "react";
// import getAllRooms from "../../../services/admin/AllroomsServices";
// import { FaBookmark, FaUserTie } from "react-icons/fa";
// import { CiLogout, CiLogin, CiBookmark } from "react-icons/ci";
// import { IoLogOut  } from "react-icons/io5";
// const AdminStatics = () => {
//   const [data, setData] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await getAllRooms();
//       setData(response.summary_statistics);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const { total_bookings, total_check_ins, total_check_outs, total_vendors } =
//     data;

//   return (
//     <div className="flex md:gap-6  justify-between">
//       <div className="gap-3 bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-8  flex items-center">
//         <div>
//           <p className="text-lg font-bold text-start">{total_bookings}</p>
//           <h1 className=" font-normal">Total Booking</h1>
//         </div>
//         <div>
//           <FaBookmark    size={26}/>
//         </div>
//       </div>
//       <div className="gap-3 bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-8 flex items-center">
//         <div>
//           <p className="text-lg font-bold text-start">{total_check_ins}</p>
//           <h1 className=" font-normal">Total Check In</h1>
//         </div>
//         <div>
//           <IoLogOut   size={40}/>
//         </div>
//       </div>
//       <div className="gap-3 bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-8 flex items-center">
//         <div>
//           <p className="text-lg font-bold text-start">{total_check_outs}</p>
//           <h1 className=" font-normal">Total Check Out</h1>
//         </div>
//         <div>
//           <IoLogOut className="rotate-180"   size={40}  /> 
//         </div>
//       </div>
//       <div className="gap-3 bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-8 flex items-center">
//         <div>
//           <p className="text-lg font-bold text-start">{total_vendors}</p>
//           <h1 className=" font-normal">Total Vendors</h1>
//         </div>
//         <div>
//           <FaUserTie   size={30}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStatics;


import { useEffect, useState } from "react";
import getAllRooms from "../../../services/admin/AllroomsServices";
import { FaBookmark, FaUserTie } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

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
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
      <div className="flex items-center bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-6 md:p-8">
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">{total_bookings}</p>
          <h1 className="text-sm font-normal">Total Booking</h1>
        </div>
        <div className="ml-4">
          <FaBookmark size={26} />
        </div>
      </div>

      <div className="flex items-center bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-6 md:p-8">
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">{total_check_ins}</p>
          <h1 className="text-sm font-normal">Total Check In</h1>
        </div>
        <div className="ml-4">
          <IoLogOut size={40} />
        </div>
      </div>

      <div className="flex items-center bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-6 md:p-8">
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">{total_check_outs}</p>
          <h1 className="text-sm font-normal">Total Check Out</h1>
        </div>
        <div className="ml-4">
          <IoLogOut className="rotate-180" size={40} />
        </div>
      </div>

      <div className="flex items-center bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-6 md:p-8">
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">{total_vendors}</p>
          <h1 className="text-sm font-normal">Total Vendors</h1>
        </div>
        <div className="ml-4">
          <FaUserTie size={30} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatics;
