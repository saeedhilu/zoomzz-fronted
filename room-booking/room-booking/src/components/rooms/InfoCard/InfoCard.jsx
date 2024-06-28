import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ icon, description }) => {
  return (
    <div className="bg-slate-100 p-4 shadow-lg rounded-sm ">
      <div className="info-card-icon flex justify-center mb-4">
        <FontAwesomeIcon icon={icon} className="text-2xl text-gray-600" />
      </div>
      <p className="font-semibold">{description}</p>
    </div>
  );
};

export default InfoCard;
