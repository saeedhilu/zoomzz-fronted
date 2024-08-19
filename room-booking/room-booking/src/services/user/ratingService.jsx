

// This services file handle CRUD operation of Rating
// ---------------------------------------------------

import React from "react";
import instance from "../../utils/Axiox";




// ----------------------------------------------------------
//  This method habdle the Post method
// ----------------------------------------------------------
export const createRating = async (room_id, ratingData) => {
    console.log('reservartin data ',ratingData);
  try {
    const response = await instance.post(`accounts/rooms/${room_id}/ratings/create/`, 
        {
            rating: ratingData.rating,
            feedback: ratingData.comment
        }
    );
    console.log('Rating created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};


// ----------------------------------------------------------
// This method handle the put method
// ----------------------------------------------------------

export const updateRating = async (room_id, rating_id, ratingData) => {
    console.log('====================================');
    console.log('dta is :',room_id),rating_id,ratingData;
    console.log('====================================');
    try {
        const response = await instance.put(`accounts/rooms/${room_id}/ratings/${rating_id}/`, {
            rating: ratingData.rating,
            feedback: ratingData.comment
        });
        console.log('Rating updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};


// -------------------------------------
// This View handle the deleting rating 
// -------------------------------------
export const deleteRating = async (room_id, rating_id) => {
    try {
        const response = await instance.delete(`accounts/rooms/${room_id}/ratings/${rating_id}/`);
        console.log('Rating deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};
