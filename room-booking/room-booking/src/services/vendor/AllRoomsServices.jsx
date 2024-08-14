// services/admin/Catogary.js
import instance from "../../utils/Axiox";

const getRooms = async () => {
  try {
    const response = await instance.get("rooms/vendor/rooms/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createRooms = async (data) => {
    console.log('name',data);
  try {
    const response = await instance.post("rooms/create/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Rooms:", error);
    throw error;
  }
};

const deleteRooms = async (id) => {
  try {
    const response = await instance.delete(`rooms/edit/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Rooms:", error);
    throw error;
  }
};

const updateRooms = async (id, updatedData) => {
  console.log("services", updatedData);

  try {
    const response = await instance.put(`rooms/edit/${id}/`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating Rooms:", error);
    throw error;
  }
};

export default { getRooms, deleteRooms, updateRooms, createRooms };
