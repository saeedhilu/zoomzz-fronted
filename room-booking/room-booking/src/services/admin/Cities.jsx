import instance from "../../utils/Axiox";

const getCity = async () => {
  try {
    const response = await instance.get("cities/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createCity = async (data) => {
    console.log('name',data);
  try {
    const response = await instance.post("cities/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating City:", error);
    throw error;
  }
};

const deleteCity = async (id) => {
  try {
    const response = await instance.delete(`cities/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting City:", error);
    throw error;
  }
};

const updateCity = async (id, updatedData) => {
  console.log("services", updatedData);
  try {
    const response = await instance.patch(`cities/${id}/`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating City:", error);
    throw error;
  }
};

export default { getCity, deleteCity, updateCity, createCity };
