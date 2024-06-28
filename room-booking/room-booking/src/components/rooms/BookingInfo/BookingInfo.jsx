import React, { useState } from 'react';
import { renderStars } from "../../../utils/ratingStar"; 

const BookingInfo = ({ room }) => {

  const [guests, setGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <div className='flex'>
        <img 
          src={room.image} 
          alt={room.name}
          className='w-1/3 rounded-md'
        />
        <div className='p-2'>
          <h2 className="text-lg font-semibold">{room.name}</h2>
          <p className="text-gray-600 flex items-center font-normal">
            {room.location.city}, {room.location.name}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        {renderStars(room.average_rating)}
        <span>{room.user_feedbacks.length} Reviews</span>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-lg font-semibold">${room.price_per_night}</div>
        <div>per night</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-in Date</label>
        <input
          type="date"
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-out Date</label>
        <input
          type="date"
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Guests</label>
        <input
          type="number"
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
        />
      </div>
      <button 
        className="bg-black text-white w-full py-2 rounded"
        // onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingInfo;
