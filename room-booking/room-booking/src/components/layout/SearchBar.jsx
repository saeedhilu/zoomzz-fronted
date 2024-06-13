// SearchBar.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    // Construct query parameters
    const searchParams = new URLSearchParams();
    if (selectedLocation) searchParams.append('location', selectedLocation);
    if (checkInDate) searchParams.append('check_in', checkInDate);
    if (checkOutDate) searchParams.append('check_out', checkOutDate);
    if (guestCount) searchParams.append('guest_count', guestCount);

    // Navigate to search results page with query parameters
    history.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      {/* Location Dropdown */}
      <div>
        <label htmlFor="location" className="block text-gray-700">Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="">Select a location</option>
          {locations.map(location => (
            <option key={location.id} value={location.name}>{location.name}</option>
          ))}
        </select>
      </div>

      {/* Check-in Date */}
      <div>
        <label htmlFor="checkInDate" className="block text-gray-700">Check-in:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Check-out Date */}
      <div>
        <label htmlFor="checkOutDate" className="block text-gray-700">Check-out:</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Guest Count */}
      <div>
        <label htmlFor="guestCount" className="block text-gray-700">Guests:</label>
        <input
          type="number"
          id="guestCount"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
