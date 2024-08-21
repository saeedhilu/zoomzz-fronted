import React, { useEffect, useState } from "react";
import getTopVendors from "../../../services/vendor/GetVendorTopRooms";  // You'll need to create this service
import { renderStars } from "../../../utils/ratingStar";

const VendorTopRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchTopRooms = async () => {
      try {
        const data = await getTopVendors();
        console.log("Top rooms data:", data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching top rooms:", error);
      }
    };

    fetchTopRooms();
  }, []);

  return (
    <section className="mt-8 w-full">
      <h2 className="text-2xl font-bold mb-4">Top Rooms</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left truncate">#</th>
              <th className="py-3 px-4 text-left truncate">Room Image</th>
              <th className="py-3 px-4 text-left truncate">Room Name</th>
              <th className="py-3 px-4 text-left truncate">Average Rating</th>
              <th className="py-3 px-4 text-left truncate">No. of Ratings</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-4 px-4 text-left truncate">{idx + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-3 px-4">{room.name}</td>
                <td className="py-3 px-4">
                  {renderStars(room.average_rating)}({room.average_rating})
                </td>
                <td className="py-3 px-4">{room.rating_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VendorTopRooms;
