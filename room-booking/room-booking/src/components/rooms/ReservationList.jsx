import React, { useEffect, useState } from "react";
import { getConfirmedRooms, getPendingRooms } from "../../services/ReservationStatusServices";
import getCanceledRooms from "../../services/CancelledRoomServices";

const ReservationStatusList = ({ currentTab }) => {
  const [reservationStatus, setReservationStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservationStatus = async () => {
    try {
      setError(null);
      setLoading(true);
      let response;

      switch (currentTab) {
        case "confirmed":
          response = await getConfirmedRooms();
          break;
        case "pending":
          response = await getPendingRooms();
          break;
        case "canceled":
          response = await getCanceledRooms();
          break;
        default:
          break;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setReservationStatus('data');
    } catch (error) {
      setError(`Error fetching reservations: ${error.message}`);
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationStatus();
  }, [currentTab]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  

  if (reservationStatus.length === 0) {
    return <div className="text-center text-gray-500">No reservations available.</div>;
  }

  return (
    <div className="space-y-4">
      {reservationStatus.map((reservation) => (
        <div key={reservation.id} className="bg-white p-4 rounded-md shadow flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h3 className="text-lg font-semibold">{reservation.room_name}</h3>
              <p className="text-gray-500">User: {reservation.user_name}</p>
              <p className="text-gray-500">Check-in: {reservation.check_in}</p>
              <p className="text-gray-500">Check-out: {reservation.check_out}</p>
              <p className="text-gray-500">Guests: {reservation.total_guest}</p>
            </div>
          </div>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "canceled"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={currentTab === "canceled"}
          >
            {currentTab === "canceled" ? "Canceled" : "Confirmed"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReservationStatusList;
