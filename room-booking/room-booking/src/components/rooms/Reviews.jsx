import React from 'react';
import { renderStars } from "../../utils/ratingStar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Reviews = ({ reviews, averageRating }) => {

  const showRating = averageRating > 0; // Check if there are reviews with non-zero average rating
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Reviews</h2>
      {showRating ? (
        <div className="flex items-center">
          {renderStars(averageRating)}
          <span className="ml-2">{parseFloat(averageRating).toFixed(1)} ({reviews.length} Reviews)</span>
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
      <div className="mt-4">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="rounded-full overflow-hidden w-10 h-10">
              {review.user__image && review.user__image !== 'default.jpg' ? (
                <img
                  src={`http://127.0.0.1:8000/images/${review.user__image}`}
                  alt={`${review.user__username}'s profile`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="text-gray-300 w-10 h-10" />
              )}
            </div>
            <div className="ml-4">
              <p className="font-semibold">{review.user__username}</p>
              <div className="flex items-center">
                {renderStars(review.rating)}
                <span className="ml-2">{review.rating}</span>
              </div>
              <p className="text-gray-600 font-medium">{review.feedback}</p>
              <p className="text-gray-500 text-sm font-medium">Reviewed on {formatDate(review.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatDate = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export default Reviews;
