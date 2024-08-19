import React, { useState, useEffect } from "react";
import {
  getConfirmedRooms,
  getPendingRooms,
  getCanceledRooms,
  // Add this import
} from "../../services/ReservationStatusServices";
import Spinner from "../Spinner/Spinner";
import { RatingFormModal } from "../modals/RatingModal";
import { FaRegStar, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import cancelReservation from "../../services/user/CancellationServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationStatusList = ({ currentTab }) => {
  const [reservationStatus, setReservationStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [pendingRooms, setPendingRoom] = useState([]);
  console.log("pendign ", pendingRooms);

  console.log("resservation si s:", selectedReservationId);

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
          setPendingRoom(response);
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

  const handleAddReview = (reservationId) => {
    const selectedReservation = reservationStatus.find(
      (reservation) => reservation.room_id === reservationId
    );
    setSelectedReservationId(reservationId);
    setRatingData(selectedReservation?.user_rating || null); // Set existing rating data or null
    setShowModal(true);
  };

  const handleUpdateReview = (reservationId) => {
    const selectedReservation = reservationStatus.find(
      (reservation) => reservation.room_id === reservationId
    );
    setSelectedReservationId(reservationId);
    setRatingData(selectedReservation?.user_rating || null); // Set existing rating data or null
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservationId(null);
    setRatingData(null);
  };

  const handleSubmitReview = ({ reservationId, rating, comment }) => {
    handleCloseModal();
    fetchReservationStatus(); // Refresh data after update
  };

  const handleCancelReservation = async (reservationId) => {
    console.log(" reservatino from cancellation :", reservationId);

    try {
      await cancelReservation(reservationId);
      toast.success("Reservation canceled successfully!");
      fetchReservationStatus();
    } catch (error) {
      toast.error(
        error.response.data.Error
          ? error.response.data.Error
          : `Error canceling reservation: ${error.message}`
      );
    }
  };

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
      <div className="text-center text-gray-500">
        No reservations available.
      </div>
    );
  }

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
            <div className="font-semibold">
              <h3 className="text-lg font-semibold">{reservation.room_name}</h3>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <p>Check-in {reservation.check_in}</p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <p>Check-out: {reservation.check_out}</p>
              </div>
              <div className="flex items-center">
                <FaUserFriends className="mr-1" />
                <p>Guests: {reservation.total_guest}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentTab === "completed" &&
              (reservation.user_rating ? (
                <button
                  className="px-4 py-2 flex items-center text-black font-semibold rounded-3xl bg-gray-500 cursor-pointer"
                  onClick={() => handleUpdateReview(reservation.room_id)}
                >
                  <IoIosStar fill="yellow" className="mr-1" />
                  Update Review
                </button>
              ) : (
                <button
                  className="px-4 py-2 flex items-center text-black font-semibold rounded-3xl bg-gray-500"
                  onClick={() => handleAddReview(reservation.room_id)}
                >
                  <FaRegStar className="mr-1" />
                  Add Review
                </button>
              ))}
            {(currentTab === "upcoming" || currentTab === "cancelled") && (
              <button
                className="px-4 py-2 rounded-3xl bg-red-500 text-white"
                onClick={() => handleCancelReservation(reservation.id)}
              >
                Cancel Reservation
              </button>
            )}
          </div>
        </div>
      ))}
      {showModal && (
        <RatingFormModal
          reservation={reservationStatus.find(
            (reservation) => reservation.room_id === selectedReservationId
          )}
          onClose={handleCloseModal}
          onSubmit={handleSubmitReview}
          ratingData={ratingData}
        />
      )}
    </div>
  );
};

export default ReservationStatusList;
