import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons"; // Use faBuilding as an example icon

const RoomCategory = ({ category }) => {
  return (
    <div className="flex m-auto flex-col bg-gray-100 p-4 rounded-lg h-24 shadow-lg">
      <div className="img-div w-10 m-auto">
        {/*  image already listed on db */}


         {/* <img src={category.image} alt="catogary image" /> */}
        <FontAwesomeIcon icon={faBuilding} className="text-3xl text-gray-600" />
      </div>
      <h2 className="mt-3 text-xl font-semibold text-center">{category.name}</h2>
    </div>
  );
};

export default RoomCategory;
