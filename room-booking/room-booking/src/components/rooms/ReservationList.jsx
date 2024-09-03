import React, { useState, useEffect } from "react";
import {
  getConfirmedRooms,
  getPendingRooms,
  getCanceledRooms,
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

  const handleAddReview = (reservationId) => {
    const selectedReservation = reservationStatus.find(
      (reservation) => reservation.room_id === reservationId
    );
    setSelectedReservationId(reservationId);
    setRatingData(selectedReservation?.user_rating || null);
    setShowModal(true);
  };

  const handleUpdateReview = (reservationId) => {
    const selectedReservation = reservationStatus.find(
      (reservation) => reservation.room_id === reservationId
    );
    setSelectedReservationId(reservationId);
    setRatingData(selectedReservation?.user_rating || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservationId(null);
    setRatingData(null);
  };

  const handleSubmitReview = ({ reservationId, rating, comment }) => {
    handleCloseModal();
    fetchReservationStatus();
  };

  const handleCancelReservation = async (reservationId) => {
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
    <div className="space-y-4 w-full">
      {reservationStatus.map((reservation) => (
        <div
          key={reservation.room_id}
          className="bg-white p-4 rounded-md shadow flex flex-col md:flex-row items-center justify-between overflow-x-auto space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <img
              className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-sm"
              src={reservation.room_image}
              alt={`${reservation.room_name}`}
            />
            <div className="font-semibold text-center md:text-left">
              <h3 className="text-base md:text-lg font-semibold">
                {reservation.room_name}
              </h3>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <p className="text-sm md:text-base">Check-in {reservation.check_in}</p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <p className="text-sm md:text-base">Check-out: {reservation.check_out}</p>
              </div>
              <div className="flex items-center">
                <FaUserFriends className="mr-1" />
                <p className="text-sm md:text-base">Guests: {reservation.total_guest}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
            {currentTab === "completed" &&
              (reservation.user_rating ? (
                <button
                  className="px-4 py-2 w-full md:w-auto text-sm md:text-base flex items-center text-black font-semibold rounded-3xl bg-gray-500 cursor-pointer"
                  onClick={() => handleUpdateReview(reservation.room_id)}
                >
                  <IoIosStar fill="yellow" className="mr-1" />
                  Update Review
                </button>
              ) : (
                <button
                  className="px-4 py-2 w-full md:w-auto text-sm md:text-base flex items-center text-black font-semibold rounded-3xl bg-gray-500"
                  onClick={() => handleAddReview(reservation.room_id)}
                >
                  <FaRegStar className="mr-1" />
                  Add Review
                </button>
              ))}
            {(currentTab === "upcoming" || currentTab === "cancelled") && (
              <button
                className="px-4 py-2 w-full md:w-auto rounded-3xl bg-red-500 text-white text-sm md:text-base"
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
