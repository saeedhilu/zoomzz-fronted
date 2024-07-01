// src/components/booking/BookingForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InputField from '../common/InputField';
import useGuestCount from '../../hooks/useGuestCount';

const BookingForm = () => {
  const location = useLocation();
  const bookingDetails = location.state;
  const { guests: initialGuests, checkInDate, checkOutDate, max_occupancy } = bookingDetails;

  const { guests, error, handleGuestCount } = useGuestCount(initialGuests, max_occupancy);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      firstName,
      email,
      phoneNumber,
      guests,
      checkInDate,
      checkOutDate,
    });
    // Add further logic here, e.g., API call or state update
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <form onSubmit={handleSubmit}>
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
          value={checkInDate || ''}
          readOnly
        />
        <InputField
          label="Check-out Date"
          id="checkOutDate"
          type="date"
          value={checkOutDate || ''}
          readOnly
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
