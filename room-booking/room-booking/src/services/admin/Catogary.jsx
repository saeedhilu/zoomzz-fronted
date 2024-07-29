// services/admin/Catogary.js
import instance from "../../utils/Axiox";

const getCategory = async () => {
    try {
        const response = await instance.get('category/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await instance.delete(`category/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

const updateCategory = async (id, updatedData) => {
    try {
        const response = await instance.put(`category/${id}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export default { getCategory, deleteCategory, updateCategory };
