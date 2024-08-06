import instance from "../../utils/Axiox";

const getCountry = async () => {
  try {
    const response = await instance.get("country/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createCountry = async (data) => {
    console.log('name',data);
  try {
    const response = await instance.post("country/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Country:", error);
    throw error;
  }
};

const deleteCountry = async (id) => {
  try {
    const response = await instance.delete(`country/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Country:", error);
    throw error;
  }
};

const updateCountry = async (id, updatedData) => {
  console.log("services", updatedData);
  try {
    const response = await instance.patch(`country/${id}/`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating Country:", error);
    throw error;
  }
};

export default { getCountry, deleteCountry, updateCountry, createCountry };
