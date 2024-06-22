import React, { useState, useEffect } from "react";
import topRatedRoomsService from "../../services/topRatedRoomsService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-300" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-300" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="text-gray-300" />);
    }

    return stars;
  };

  console.log("Top Rated Rooms:", topRatedRooms);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4 ml-6">Top Rated Rooms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {topRatedRooms.map((room) => (
            <div key={room.id} className="bg-white shadow-md rounded-md p-4">
              <div className="relative mb-4 w-full h-48">
                <img src={room.image} alt={room.name} className="rounded-md w-full h-full object-cover" />
                import React, { useState, useEffect } from "react";
import topRatedRoomsService from "../../services/topRatedRoomsService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

const TopRatedRooms = () => {
  const [topRatedRooms, setTopRatedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedRooms = async () => {
      try {
        const data = await topRatedRoomsService();
        console.log("Fetched data:", data);
        setTopRatedRooms(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching top rated rooms:", error);
        setLoading(false);
      }
    };
    fetchTopRatedRooms();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-300" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-300" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="text-gray-300" />);
    }

    return stars;
  };

  console.log("Top Rated Rooms:", topRatedRooms);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4 ml-6">Top Rated Rooms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {topRatedRooms.map((room) => (
            <div key={room.id} className="bg-white shadow-md rounded-md p-4">
              <div className="relative mb-4 w-full h-48">
                <img src={room.image} alt={room.name} className="rounded-md w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 flex">
                  {renderStars(room.average_rating)}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{room.name}</h3>
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
 <div className="absolute bottom-2 left-2 flex">
                  {renderStars(room.average_rating)}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{room.name}</h3>
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
