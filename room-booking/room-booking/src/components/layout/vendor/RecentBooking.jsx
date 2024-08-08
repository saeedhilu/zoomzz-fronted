import React, { useEffect, useState } from "react";
import getSummaryStatics from "../../../services/vendor/VendorStatics";

const RecentBookings = () => {
  const [recentBookings, setRecentBookings] = useState([]);

  const localHost = "http://127.0.0.1:8000/";
  console.log("receb booking data is :", recentBookings);

  const fetchData = async () => {
    try {
      const response = await getSummaryStatics();
      console.log("response for get vendor statics ,,,", response);
      setRecentBookings(response.recent_bookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-4">
      <header className="text-3xl font-bold mb-3 border-b-2 border-gray-400 pb-2">
        <h1 className="text-2xl font-bold mb-4">Recent Bookings</h1>
      </header>
      <section className="overflow-x-auto h-full">
        <div className="overflow-y-auto h-[calc(100vh-110px)]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr className=" text-left">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Room Name</th>
                <th className="py-2 px-4 border-b">User </th>
                <th className="py-2 px-4 border-b">Check-In</th>
                <th className="py-2 px-4 border-b">Check-Out</th>
                <th className="py-2 px-4 border-b">Total Guests</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, idx) => {
                const {
                  id,
                  room_image,
                  room_name,
                  user_name,
                  first_name,
                  last_name,
                  check_in,
                  check_out,
                  total_guest,
                  contact_number,
                  email,
                } = booking;

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{idx + 1}</td>
                    <td className="py-2 px-4 border-b flex items-center">
                      <img
                        src={localHost + room_image}
                        alt={room_name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      {room_name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user_name
                        ? `${user_name}`
                        : `${first_name} ${last_name}`}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(check_in).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(check_out).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{total_guest}</td>
                    <td
                      className={`py-2 px-4 ${
                        contact_number ? "" : "text-red-500"
                      } border-b`}
                    >
                      {contact_number || "Not Available"}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${
                        email ? "" : "text-red-500"
                      }`}
                    >
                      {email || "Not Available"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default RecentBookings;
