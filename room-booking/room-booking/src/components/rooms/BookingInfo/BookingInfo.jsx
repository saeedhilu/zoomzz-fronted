import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { renderStars } from "../../../utils/ratingStar";
import useGuestCount from "../../../hooks/useGuestCount";
import "../../../style/flatpickr-custom.css";

const BookingInfo = ({ room }) => {


  const {
    name,
    image,
    location: { city, name: locationName },
    price_per_night: pricePerNight,
    user_feedbacks: userFeedbacks,
    max_occupancy: maxOccupancy,
    average_rating: averageRating,
  } = room;

  const [dateRange, setDateRange] = useState([null, null]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { guests, error, handleGuestCount } = useGuestCount(1, maxOccupancy);
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [dateRange, guests]);

  const calculateTotalPrice = () => {
    if (dateRange[0] && dateRange[1]) {
      const checkInDate = new Date(dateRange[0]);
      const checkOutDate = new Date(dateRange[1]);
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const days = timeDifference / (1000 * 3600 * 24);
      const price = days * pricePerNight;
      setTotalPrice(price);
    } else {
      setTotalPrice(pricePerNight);
    }
  };

  const handleBooking = () => {
    const bookingDetails = {
      room,
      guests,
      checkInDate: formatDate(dateRange[0]),
      checkOutDate: formatDate(dateRange[1]),
      totalPrice,
      maxOccupancy,
    };
    navigate("/booking", { state: bookingDetails });
  };

  const days =
    dateRange[0] && dateRange[1]
      ? (new Date(dateRange[1]).getTime() - new Date(dateRange[0]).getTime()) /
        (1000 * 3600 * 24)
      : 0;

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md ">
      <div className="flex">
        <img src={image} alt={name} className="w-1/3 rounded-md" />
        <div className="p-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-600 flex items-center font-normal">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-gray-500 mr-2"
            />
            {city}, {locationName}
          </p>
          <div className="flex items-center space-x-2 mb-4">
            {renderStars(averageRating)}
            <span>({userFeedbacks.length} Reviews)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700">Select Dates</label>
          <div className="relative">
            <Flatpickr
              className="border rounded-full w-full py-2 px-3 text-gray-700 pl-10"
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              options={{ mode: "range", dateFormat: "Y-m-d" }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-5">
          <label className="block text-gray-700">Guests</label>
          <input
            type="number"
            className="border rounded-full w-full py-2 px-3 text-gray-700"
            value={guests}
            onChange={handleGuestCount}
            min="1"
            max={maxOccupancy}
          />
          <div className="h-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
      <hr />
      <div className="booking ">
        <div className="flex items-center p-4  justify-between ">
          <h4>Price Per Night </h4>
          <p className="  text-red-500">: ₹ {pricePerNight}</p>
        </div>

        <div className="items-center p-4  ">
          {dateRange[0] && dateRange[1] ? (
            <div className="flex justify-between">
              Total : {days} Night{days !== 1 && "s"} X {pricePerNight}
              {guests !== 1 && "s"}
              <p className=" text-red-500">: ₹ {totalPrice}</p>
            </div>
          ) : (
            <div className="flex justify-between">
              <p className="">Select dates</p>
              <p>----</p>
            </div>
          )}
        </div>
      </div>

      <button
        className="bg-black text-white w-full mt-5 py-2 rounded"
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingInfo;
