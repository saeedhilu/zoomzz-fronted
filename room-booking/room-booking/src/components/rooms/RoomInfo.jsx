import React from 'react';
import RoomCategory from './RoomCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import the pet and location icons

const RoomInfo = ({ room }) => (
  <div className="p-6 ">
    <h1 className="text-3xl font-semibold text-gray-800 mt-4">{room.name}</h1>
    <p className="text-gray-600 mt-2 flex items-center">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
      {room.location.country}, {room.location.city}, {room.location.name}
    </p>
    <div className="flex items-center space-x-4 mt-4">
      <RoomCategory category={room.category} />
      <p className="bg-gray-100 h-16 rounded-md w-24  text-center  text-lg font-medium flex items-center justify-center text-gray-800">
        {room.max_occupancy} Guests
      </p>
      <p className="bg-gray-100 h-16 rounded-md w-32 h text-center flex flex-col font-medium items-center justify-center text-gray-800">
        <FontAwesomeIcon icon={faPaw} className="mr-2" />
        {room.pet_allowed ? 'Pet Allowed' : 'No Pets'}
      </p>
    </div>
    <p className="mt-4 text-gray-700 leading-relaxed">{room.description}</p>
  </div>
);

export default RoomInfo;
