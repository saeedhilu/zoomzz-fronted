import instance from "../../utils/Axiox";

const cancelReservation = async (id) => {
  console.log("reservartin data ", id);
  try {
    const response = await instance.post(
      `accounts/reservations/canellation/${id}/`
    );
    console.log("Bookihg  Cancelled  successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
export default cancelReservation;
