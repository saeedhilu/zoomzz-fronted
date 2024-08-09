// services/admin/Catogary.js
import instance from "../../utils/Axiox";

const getCategory = async () => {
  try {
    const response = await instance.get("categories/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createCategory = async (data) => {
    console.log('name',data);
  try {
    const response = await instance.post("category/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await instance.delete(`category/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

const updateCategory = async (id, updatedData) => {
  console.log("services", updatedData);
  try {
    const response = await instance.patch(`category/${id}/`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export default { getCategory, deleteCategory, updateCategory, createCategory };
