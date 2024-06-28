import React from 'react';
import RoomCategory from './RoomCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw,faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import the pet and location icons

const RoomInfo = ({ room }) => (
  <div className="p-6 ">
    <h1 className="text-3xl  text-gray-800 mt-4 font-bold">{room.name}</h1>
    <p className="text-gray-600 mt-2 flex items-center font-medium">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 "  />
      {room.location.country}, {room.location.city}, {room.location.name}
    </p>
    <div className="flex items-center space-x-4 mt-4">
      <RoomCategory category={room.category} />
      <p className="bg-gray-100 h-24 rounded-md w-32 shadow-lg text-center flex flex-col font-medium items-center justify-center text-gray-800 ">
      <FontAwesomeIcon icon={faUser} className="mr-2" size='2x text-gray-600' />
        <h2 className="mt-3 text-xl font-semibold text-center">{room.max_occupancy} Guests</h2>
      </p>
      <p className="bg-gray-100 h-24 shadow-lg  rounded-md w-32 h text-center flex flex-col font-medium items-center justify-center text-gray-800">
        <FontAwesomeIcon icon={faPaw}  className="text-2xl text-gray-600"  />
        <h2 className="mt-3 text-xl font-semibold text-center">{room.pet_allowed ? 'Pet Allowed' : 'No Pets Allowed'}</h2>
        
      </p>
    </div>
    <p className="mt-4 text-gray-700 leading-relaxed">{room.description}</p>
  </div>
);

export default RoomInfo;
