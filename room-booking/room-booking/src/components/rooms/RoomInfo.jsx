import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faUser,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons"; 
import InfoCard from "./InfoCard/InfoCard";
import RoomCategory from './RoomCategory'

const RoomInfo = ({ room }) => (
  <div >
    <h1 className="text-3xl  text-gray-800 mt-4 font-bold">{room.name}</h1>
    <p className="text-gray-600 mt-2 flex items-center font-medium">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 " />
      {room.location.country}, {room.location.city}, {room.location.name}
    </p>
    <div className="flex gap-3 mt-3">
    <RoomCategory category={room.category} />

      <InfoCard icon={faUser} description={`${room.max_occupancy} Guests`} />
      <InfoCard
        icon={faPaw}
        description={room.pet_allowed ? "Pets Allowed" : "No Pets Allowed"}
      />
    </div>
    <h1 className="mt-7 font-bold text-xl pb-2 border-b-2 border-gray-300">Property Description</h1>
    <p className="mt-4 ">{room.description}</p>
  </div>
);

export default RoomInfo;
