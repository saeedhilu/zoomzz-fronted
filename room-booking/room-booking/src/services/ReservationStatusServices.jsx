// ReservationStatusServices.js
import instance from "../utils/Axiox";

const fetchReservationStatus = async (endpoint) => {
    try {
        const response = await instance.get(endpoint);
        console.log('data from reservation status',response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getConfirmedRooms = () => fetchReservationStatus('accounts/confirmed-rooms/');
export const getPendingRooms = () => fetchReservationStatus('accounts/pending-rooms/');
export const getCanceledRooms = () => fetchReservationStatus('accounts/canceled-rooms/');  
