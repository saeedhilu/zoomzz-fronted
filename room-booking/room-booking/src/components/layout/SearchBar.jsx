import React, { useState } from 'react';
import { SearchIcon, CalendarIcon, UsersIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const SearchBar = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const handleSearch = () => {
    // Handle search logic here
    console.log('Search clicked!');
  };

  return (
    <div className="flex items-center justify-center w-full bg-white p-4 rounded-full shadow-lg space-x-4">
      {/* Location Dropdown */}
      <div className="flex items-center space-x-2">
        <LocationMarkerIcon className="w-6 h-6 text-gray-600" />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border-none bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
          placeholder="Which city do you prefer?"
        >
          <option value="">Location</option>
          {locations.map(location => (
            <option key={location.id} value={location.name}>{location.name}</option>
          ))}
        </select>
      </div>

      {/* Check-in Date */}
      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-6 h-6 text-gray-600" />
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="border-none bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
          placeholder="Check-in"
        />
      </div>

      {/* Check-out Date */}
      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-6 h-6 text-gray-600" />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="border-none bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
          placeholder="Check-out"
        />
      </div>

      {/* Guest Count */}
      <div className="flex items-center space-x-2">
        <UsersIcon className="w-6 h-6 text-gray-600" />
        <input
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          className="border-none bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
          placeholder="Guests"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchBar;
