import React, { useState, useEffect } from "react";
import {
  getConfirmedRooms,
  getPendingRooms,
  getCanceledRooms,
} from "../../services/ReservationStatusServices";
import Spinner from "../Spinner/Spinner";
import { RatingFormModal } from "../modals/RatingModal";
import { FaRegStar, FaCalendarAlt, FaUserFriends} from "react-icons/fa";

const ReservationStatusList = ({ currentTab }) => {
  const [reservationStatus, setReservationStatus] = useState([]);
  console.log('resr',reservationStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const fetchReservationStatus = async () => {
    try {
      setError(null);
      setLoading(true);
      let response;

      switch (currentTab) {
        case "completed":
          response = await getConfirmedRooms();
          break;
        case "upcoming":
          response = await getPendingRooms();
          break;
        case "cancelled":
          response = await getCanceledRooms();
          break;
        default:
          throw new Error(`Invalid tab: ${currentTab}`);
      }

      setReservationStatus(response);
    } catch (error) {
      setError(`Error fetching reservations: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationStatus();
  }, [currentTab]);

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (reservationStatus.length === 0) {
    return (
      <div className="text-center text-gray-500">No reservations available.</div>
    );
  }

  const handleAddReview = (reservationId) => {
    const selectedReservation = reservationStatus.find(
      (reservation) => reservation.room_id === reservationId
    );
    setSelectedReservationId(reservationId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservationId(null);
  };

  const handleSubmitReview = ({ reservationId, rating, comment }) => {
    console.log(`Submit review for reservation ID: ${reservationId}`);
    console.log(`Rating: ${rating}`);
    console.log(`Comment: ${comment}`);
    handleCloseModal();
  };

  return (
    <div className="space-y-4">
      {reservationStatus.map((reservation) => (
        <div
          key={reservation.room_id}
          className="bg-white p-4 rounded-md shadow flex items-center justify-between"
        >
          <div className="flex items-center">
            <img
              className="w-20 h-20 bg-gray-200 rounded-sm mr-4"
              src={reservation.room_image}
              alt={`${reservation.room_name}`}
            />
            <div className="font-semibold ">
              <h3 className="text-lg font-semibold">{reservation.room_name}</h3>
              <div className="flex items-center ">
                <FaCalendarAlt className="mr-1" />
                <p>Check-in {reservation.check_in}</p>
              </div>
              <div className="flex items-center ">
                <FaCalendarAlt className="mr-1" />
                <p>Check-out: {reservation.check_out}</p>
              </div>
              <div className="flex items-center ">
                <FaUserFriends className="mr-1" />
                <p>Guests: {reservation.total_guest}</p>
              </div>
              
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentTab === "completed" && (
              <button
                className="px-4 py-2 flex items-center text-black font-semibold rounded-3xl"
                onClick={() => handleAddReview(reservation.id)}
              >
                <FaRegStar className="mr-1" />
                Add Review
              </button>
            )}
            <button
              className={`px-4 py-2 rounded-3xl ${
                currentTab === "cancelled"
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-500 text-white"
              }`}
              disabled={currentTab === "cancelled"}
            >
              {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
            </button>
          </div>
        </div>
      ))}
      {showModal && (
        <RatingFormModal
          reservation={reservationStatus.find(
            (reservation) => reservation.id === selectedReservationId
          )}
          onClose={handleCloseModal}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default ReservationStatusList;
