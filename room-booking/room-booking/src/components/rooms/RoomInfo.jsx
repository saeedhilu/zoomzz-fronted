import React from 'react';
import RoomCategory from './RoomCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw,faUser, faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons'; // Import the pet and location icons
import infoCard from './InfoCard/InfoCard';



const RoomInfo = ({ room }) => (
  <div className="p-6 ">
    <h1 className="text-3xl  text-gray-800 mt-4 font-bold">{room.name}</h1>
    <p className="text-gray-600 mt-2 flex items-center font-medium">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 "  />
      {room.location.country}, {room.location.city}, {room.location.name}
    </p>
  
    <infoCard icon={faUser}  description={`${room.max_occupancy} Guests`}/>
    <infoCard icon={faBuilding}  description={room.category.name} />
    <infoCard icon={faPaw}  description={room.pet_allowed ? 'Pets Allowed' : 'No Pets Allowed'}/>


    
    <p className="mt-4 text-gray-700 leading-relaxed">{room.description}</p>
  </div>
);

export default RoomInfo;
