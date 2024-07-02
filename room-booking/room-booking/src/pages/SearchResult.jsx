// components/SearchResults.js

import React from "react";
import { useLocation } from "react-router-dom";
import { renderStars } from "../utils/ratingStar"; 
import { Link } from "react-router-dom"; 
import RoomSearch from "../components/layout/SearchBar";
const SearchResults = () => {
  const location = useLocation();
  const { rooms } = location.state || { rooms: [] };
  

  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <RoomSearch/>
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Link key={room.id} to={`/room-details/${room.id}`}>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer">
                <div className="image ">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="mt-3 ml-3">
                    {renderStars(room.average_rating)}
                    <span className="text-gray-600 ">
                      {room.rating_count > 0 ? `${room.rating_count} Reviews` : 'No reviews'} 
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <h3 className="text-xl font-semibold mb-2">{room.location.name}</h3>
                  <h3 className="text-xl font-semibold mb-2">{room.location.city}</h3>
                  <h3 className="text-xl font-semibold mb-2">{room.location.country}</h3>
                  <p className="text-gray-800 font-bold">
                    Price: ${room.price_per_night} per night
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    {room.category && (
                      <div className="flex items-center">
                        <img
                          src={room.category.image}
                          alt={room.category.name}
                          className="w-6 h-6 mr-2"
                        />
                        <p className="text-sm text-gray-600">
                          {room.category.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-600">Amenities:</p>
                    <div className="flex flex-wrap items-center mt-1">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex items-center mr-2 mb-2"
                        >
                          <img
                            src={amenity.image}
                            alt={amenity.name}
                            className="w-5 h-5 mr-1"
                          />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                      {room.amenities.length > 4 && (
                        <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                          View More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
