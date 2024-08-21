import React, { useState, useEffect } from "react";
import topRatedRoomsService from "../../services/topRatedRoomsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { renderStars } from "../../utils/ratingStar";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
const TopRatedRooms = () => {
  const [topRatedRooms, setTopRatedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedRooms = async () => {
      try {
        const data = await topRatedRoomsService();
        setTopRatedRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top rated rooms:", error);
        setLoading(false);
      }
    };
    fetchTopRatedRooms();
  }, []);

  console.log("Top Rated Rooms:", topRatedRooms);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4 ml-6 relative inline-block">
        Top Rated Rooms
        <span className="absolute bottom-0 top-11 left-0 w-full h-1  bg-gray-500"></span>
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {topRatedRooms?.map((room) => (
            <Link key={room.id} to={`/room-details/${room.id}`}>
              <div key={room.id} className="bg-white shadow-md rounded-md p-4">
                <div className="relative mb-4 w-full h-48">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="rounded-md w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex">
                    {renderStars(room.average_rating)}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                </div>
                <p className="text-gray-600 mb-2">
                  {room.location.name}, {room.location.city_name},{room.location.country_name}
                </p>
                <p className="text-gray-600">
                  {room.price_per_night} per night
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRatedRooms;
