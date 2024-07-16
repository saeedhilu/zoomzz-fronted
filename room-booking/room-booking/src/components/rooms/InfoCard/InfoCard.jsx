import React from "react";
import { FaUser, FaPaw } from "react-icons/fa";

const InfoCard = ({ description, icon }) => {
  const iconMap = {
    user: FaUser,
    pet: FaPaw,
  };

  const IconComponent = iconMap[icon];
  return (
    <div className="bg-slate-100 p-4 shadow-lg rounded-sm flex items-center flex-col justify-between" >
      {IconComponent && <IconComponent className="text-2xl text-gray-600 mr-2" />} 
      <p className="font-semibold">{description}</p>
    </div>
  );
};

export default InfoCard;
