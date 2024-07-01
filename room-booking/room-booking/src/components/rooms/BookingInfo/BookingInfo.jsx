import React, { useEffect, useState } from "react";
import { renderStars } from "../../../utils/ratingStar";
import { useNavigate } from "react-router-dom";

const BookingInfo = ({ room }) => {
  const {
    name,
    image,
    location: { city, name: locationName },
    price_per_night,
    user_feedbacks,
    max_occupancy,
    average_rating,
  } = room;

  const [guests, setGuests] = useState(1);

  const [checkinDate, setCheckinDate] = useState("");
  const [checkOutDate, setCheckoutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(price_per_night);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    if (checkinDate && checkOutDate) {
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkOutDate);
      const timeDiffrents = checkout.getTime() - checkin.getTime();
      const days = timeDiffrents / (1000 * 3600 * 24);
      const Price = days * price_per_night;
      setTotalPrice(Price);
    } else {
      setTotalPrice(price_per_night);
    }
  };

  const handleBooking = () => {
    const bookingDetails = {
      room,
      guests,
      checkinDate,
      checkOutDate,
      totalPrice,
      max_occupancy
    };

    navigate("/booking", { state: bookingDetails });
  };

  const handleGuestCount = (e) => {
    const count = e.target.value;
    setGuests(count);

    if (count > max_occupancy) {
      setError("Maximum occupancy is " + max_occupancy);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [checkinDate, checkOutDate]);
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <div className="flex">
        <img src={image} alt={name} className="w-1/3 rounded-md" />
        <div className="p-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-600 flex items-center font-normal">
            {city}, {locationName}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        {renderStars(average_rating)}
        <span>({user_feedbacks.length} Reviews)</span>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-lg font-semibold">₹ {totalPrice}</div>
        <div>per night</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-in Date</label>
        <input
          type="date"
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={checkinDate}
          onChange={(e) => setCheckinDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <img src="C:\Users\saeed\Downloads\left.png" alt="" />
        <label className="block text-gray-700">Check-out Date</label>
        <input
          type="date"
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={checkOutDate}
          onChange={(e) => setCheckoutDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Guests</label>
        <input
          type="number"
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={guests}
          onChange={handleGuestCount}
          min="1"
          max={max_occupancy}
        />
        <p className="text-red-500">{error && error}</p>
      </div>
      <button
        className="bg-black text-white w-full py-2 rounded"
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingInfo;
