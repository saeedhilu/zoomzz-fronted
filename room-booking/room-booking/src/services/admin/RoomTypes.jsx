import instance from "../../utils/Axiox";

const getRoomType = async () => {
  try {
    const response = await instance.get("room-types/");
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const createRoomsType = async (data) => {
  try {
    const response = await instance.post("roomstype/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating room type:", error);
    throw error;
  }
};

const deleteRoomsType = async (id) => {
  try {
    const response = await instance.delete(`roomstype/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room type:", error);
    throw error;
  }
};

const updateRoomsType = async (id, updatedData) => {
  try {
    const response = await instance.patch(`roomstype/${id}/`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room type:", error);
    throw error;
  }
};

export default { getRoomType, createRoomsType, deleteRoomsType, updateRoomsType };
