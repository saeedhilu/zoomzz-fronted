import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { rooms } = location.state || { rooms: [] };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-2">{room.description}</p>
                <p className="text-gray-800 font-bold">Price: ${room.price_per_night} per night</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-gray-600">⭐ {room.rating}</span>
                  <span className="text-gray-600">{room.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
