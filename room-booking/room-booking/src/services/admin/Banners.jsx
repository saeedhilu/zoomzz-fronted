import instance from "../../utils/Axiox"








const getBanner = async () => {
  try {
    const response = await instance.get("s/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createBanner = async (data) => {
    
  try {
    const response = await instance.post("s/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Banner:", error);
    throw error;
  }
};

const deleteBanner = async (id) => {
  
  try {
    const response = await instance.delete(`s/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Banner:", error);
    throw error;
  }
};

const updateBanner = async (id, updatedData) => {
  console.log("services", updatedData);
  try {
    const response = await instance.patch(`s/${id}/`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating Banner:", error);
    throw error;
  }
};

export default { getBanner, deleteBanner, updateBanner, createBanner };
