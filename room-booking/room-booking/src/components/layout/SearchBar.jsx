import React, { useState } from 'react';
import { SearchIcon, CalendarIcon, UsersIcon, LocationMarkerIcon } from '@heroicons/react/outline'; // Import icons from Heroicons

const SearchBar = ({ locations }) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const handleSearch = () => {
    // Construct query parameters as a string
    const queryParams = `location=${location.trim()},check_in=${checkInDate.trim()},check_out=${checkOutDate.trim()},guest_count=${guestCount.trim()}`;

    // Navigate to search results page with query parameters
    // history.push(`/search?${queryParams}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      {/* Location Input */}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm px-2 py-1">
        <LocationMarkerIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-32 focus:outline-none text-sm"
        />
      </div>

      {/* Check-in Date Input */}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm px-2 py-1">
        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="w-24 focus:outline-none text-sm"
        />
      </div>

      {/* Check-out Date Input */}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm px-2 py-1">
        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="w-24 focus:outline-none text-sm"
        />
      </div>

      {/* Guest Count Input */}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm px-2 py-1">
        <UsersIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="number"
          id="guestCount"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          placeholder="Guests"
          className="w-20 focus:outline-none text-sm"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <SearchIcon className="h-5 w-5 mr-2" />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
