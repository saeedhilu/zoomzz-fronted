import React, { useState, useEffect } from "react";
import topRatedRoomsService from "../../services/topRatedRoomsService";

const TopRatedRooms = () => {
  const [topRatedRooms, setTopRatedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedRooms = async () => {
      try {
        const data = await topRatedRoomsService();
        console.log("Fetched data:", data); // Log fetched data
        setTopRatedRooms(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching top rated rooms:", error);
        setLoading(false);
      }
    };
    fetchTopRatedRooms();
  }, []);

  console.log("Top Rated Rooms:", topRatedRooms);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">Top Rated Rooms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topRatedRooms.map((room) => (
            <div key={room.id} className="bg-white shadow-md rounded-md p-4">
              <img src={room.image} alt={room.name} className="rounded-md mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                  {room.average_rating} *
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                {room.location.city}, {room.location.country}
              </p>
              <p className="text-gray-600">{room.price_per_night} per night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRatedRooms;
