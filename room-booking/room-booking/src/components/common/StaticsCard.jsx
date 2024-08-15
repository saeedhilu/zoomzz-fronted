import React from "react";

const StatisticsCard = ({ value, label, icon: Icon }) => {
  return (
    <div className="flex items-center bg-blue-100 shadow-lg shadow-gray-300 rounded-lg p-6 md:p-8">
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold">{value}</p>
        <h1 className="text-sm  font-bold">{label}</h1>
      </div>
      <div className="ml-4">
        <Icon size={26} />
      </div>
    </div>
  );
};

export default StatisticsCard;
