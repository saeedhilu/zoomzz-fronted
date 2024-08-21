import instance from "../../utils/Axiox";

const getBookings = async (url=null) => {
  try {
    const finalUrl = url ? url : "vendor/bookings/"; 
    const response = await instance.get(finalUrl);
    return response.data;
  } catch (error) {
    console.log("Error is:", error);
    throw error; 
  }
};

export default getBookings;
