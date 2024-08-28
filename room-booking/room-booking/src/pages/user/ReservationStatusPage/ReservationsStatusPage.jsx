import React, { useState } from "react";
import ReservationStatusList from '../../../components/rooms/ReservationList'
import Navbar from "../../../components/layout/Navbar";

const ReservationStatusListPage = () => {
  const [currentTab, setCurrentTab] = useState("upcoming");

  return (
    <div className="container mx-auto p-10 rounded-xl   ">
       
      <h1 className="text-3xl  font-bold ml-6 font-mono">Reservations</h1>
      <div className="p-4">
        <div className="flex space-x-4 h-16">
          {[ "upcoming","completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-lg font-semibold ${
                currentTab === tab ? "border-b-4  border-gray-600 text-gray-800" : "text-gray-700"
              }`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <hr className="mb-10 " />
        <ReservationStatusList currentTab={currentTab} />
      </div>
    </div>
  );
};

export default ReservationStatusListPage;
