import React from 'react';
import { renderStars } from "../../../utils/ratingStar"; // Adjust import according to your project structure

const BookingInfo = ({ room }) => (
  <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Fully Furnished Apartment</h2>
    <div className="flex items-center space-x-2 mb-4">
      {renderStars(room.average_rating)}
      <span>{room.user_feedbacks.length} Reviews</span>
    </div>
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-lg font-semibold">${room.price_per_night}</div>
      <div>per night</div>
    </div>
    <button className="bg-black text-white w-full py-2 rounded">Book Now</button>
  </div>
);

export default BookingInfo;
