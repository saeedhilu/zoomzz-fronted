import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InputField from '../common/inputField';
import useGuestCount from '../../hooks/useGuestCount';
import BookingInfo from '../rooms/BookingInfo/BookingInfo';
import { renderStars } from '../../utils/ratingStar';
const BookingForm = () => {
  const location = useLocation();
  const bookingDetails = location.state;
  const { room, guests: initialGuests, checkInDate, checkOutDate, maxOccupancy } = bookingDetails;
  
  const { guests, error, handleGuestCount } = useGuestCount(initialGuests, maxOccupancy);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkinDate, setCheckInDate] = useState(checkInDate || '');
  const [checkoutDate, setCheckoutDate] = useState(checkOutDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      firstName,
      email,
      phoneNumber,
      guests,
      checkinDate,
      checkoutDate,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col  lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner">
        <img src={room.image} alt={room.name} className="w-96  h-48 object-cover  rounded-lg mb-4" />
        <h3 className="text-xl font-semibold">{room.name}</h3>
        <p className="text-gray-600 mb-2">{room.location.city}, {room.location.name}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500">{renderStars(room.average_rating)}</span>
          <span className="ml-2 text-gray-600">({room.user_feedbacks.length} Reviews)</span>
        </div>
        <p className="text-lg font-bold mb-4">Price per night: ₹{room.price_per_night}</p>
        <p className="text-lg font-bold text-green-600 mb-4">Discount: 10%</p>
        <p className="text-lg font-bold mb-4">Total Price: ₹{calculateTotalPrice(checkinDate, checkoutDate, room.price_per_night)}</p>
        <p className="text-lg font-bold mb-4">Selected Dates: {checkinDate} to {checkoutDate}</p>
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4"> 
          <InputField
            label="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
          <InputField
            label="Phone Number"
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91"
          />
          <InputField
            label="Guests"
            id="guests"
            type="number"
            value={guests}
            onChange={handleGuestCount}
            placeholder="Enter number of guests"
          />
          <InputField
            label="Check-in Date"
            id="checkInDate"
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <InputField
            label="Check-out Date"
            id="checkOutDate"
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-700"
          >
            Continue
          </button>
        </form>
      </div>
      
    </div>
  );
};




// TODO Reiuse !!!!!!!!!!!!!!!!!


const calculateTotalPrice = (checkinDate, checkoutDate, pricePerNight) => {
  if (checkinDate && checkoutDate) {
    const checkIn = new Date(checkinDate);
    const checkOut = new Date(checkoutDate);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const days = timeDifference / (1000 * 3600 * 24);
    return days * pricePerNight;
  }
  return 0;
};

export default BookingForm;
