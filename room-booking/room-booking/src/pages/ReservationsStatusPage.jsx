import React, { useState } from "react";
import ReservationStatusList from "../components/rooms/ReservationList"; 

const ReservationStatusListPage = () => {
  const [currentTab, setCurrentTab] = useState("confirmed");

  return (
    <div className="container mx-auto p-4 bg-slate-100 rounded-xl shadow-lg">
      <h1 className="text-3xl  mb-4 font-semibold">Reservations</h1>
      <div className=" p-4 ">
        <div className="flex space-x-4 mb-4">
          {["confirmed", "pending", "canceled"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2  ${
                currentTab === tab ? " text-black border-b-2 border-black" : ""
              }`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
         
        </div>
        <hr />
        <ReservationStatusList currentTab={currentTab} />
      </div>
    </div>
  );
};

export default ReservationStatusListPage;
