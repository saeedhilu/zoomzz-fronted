import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineBedroomChild } from "react-icons/md";
import { toast } from 'react-toastify';
import "../../style/Star.css";
import { createRating, updateRating, deleteRating } from "../../services/user/ratingService";

export const RatingFormModal = ({ reservation, onClose, onSubmit, ratingData }) => {
  console.log('====================================');
  console.log('reservation id:', reservation.room_id);
  console.log('====================================');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (ratingData) {
      setRating(ratingData.rating || 0);
      setComment(ratingData.feedback || "");
      setIsEditing(true);
    }
  }, [ratingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { rating, comment };

    try {
      if (isEditing) {
        await updateRating(reservation.room_id, ratingData.id, data);
        toast.success("Rating updated successfully!");
      } else {
        await createRating(reservation.room_id, data);
        toast.success("Rating added successfully!");
      }
      onSubmit({ reservationId: reservation.room_id, rating, comment });
      onClose();
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRating(reservation.room_id, ratingData.id);
      toast.success("Rating deleted successfully!");
      onSubmit({ reservationId: reservation.room_id, rating: null, comment: "" });
      onClose();
    } catch (error) {
      console.error("Failed to delete rating:", error);
      toast.error("Failed to delete rating.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
        <IoClose
          className="absolute top-2 right-2 text-2xl cursor-pointer text-gray-700"
          onClick={onClose}
        />
        <h1 className="text-2xl font-semibold mb-4">{isEditing ? "Update Rating" : "Add Rating"}</h1>
        <div className="flex items-center mb-4">
          <img
            className="w-20 h-20 bg-gray-200 rounded-sm mr-4"
            src={reservation.room_image}
            alt={`${reservation.room_name}`}
          />
          <div>
            <h3 className="text-lg font-semibold flex gap-2">
              <MdOutlineBedroomChild className="mt-1" />
              {reservation.room_name}
            </h3>
            <div className="flex items-center gap-3 font-semibold mb-1">
              <FaCalendarAlt />
              {reservation.check_in} - {reservation.check_out}
            </div>
            <p className="flex items-center gap-2 font-semibold">
              <FaUserGroup className="mr-1" />
              Guests: {reservation.total_guest}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
              Rating
            </label>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                  <div
                    key={starRating}
                    onClick={() => setRating(starRating)}
                    className="cursor-pointer"
                  >
                    <FaStar
                      className={`${
                        starRating <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(starRating)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
              Comment Your Thought
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 h-24 resize-none"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Submit
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
