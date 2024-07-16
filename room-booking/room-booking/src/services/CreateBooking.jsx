import instance from "../utils/Axiox";
export const createReservation = async (roomId, reservationData) => {
  console.log("room id is ", roomId);
  try {
    const response = await instance.post(
      `accounts/reservations/${roomId}/`,
      reservationData
    );
    console.log("for posting data ", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
