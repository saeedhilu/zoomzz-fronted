import instance from "../utils/Axiox";


// Handle the reservation status endpoints


const fetchReservatoinStatus = async (endpoint) =>{
    try {
        const response = await instance.get(endpoint)
        return response.data
    } catch (error) {
        console.error(`Error fetching rooms from ${endpoint}:`, error);
        throw error;
    }
}


export const getConfirmedRooms = () => fetchReservatoinStatus('/confirmed-rooms/');
export const getPendingRooms = () => fetchReservatoinStatus('/pending-rooms/');
export const getCanceledRooms = () => fetchReservatoinStatus('/canceled-rooms/');