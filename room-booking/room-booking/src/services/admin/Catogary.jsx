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
        const formData = new FormData();
        formData.append('name', updatedData.name);
        
        // Only append the image if it is provided
        if (updatedData.image) {
            formData.append('image', updatedData.image);
        }

        const response = await instance.patch(`category/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export default { getCategory, deleteCategory, updateCategory };
