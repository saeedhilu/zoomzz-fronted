import instance from "../../utils/Axiox";

// Fetch all bed types
const getBedType = async () => {
  try {
    const response = await instance.get('bed-types/');
    return response.data;
  } catch (error) {
    console.error('Error fetching bed types:', error);
    throw error; 
  }
};

// Create a new bed type
const createBedType = async (formData) => {
  try {
    const response = await instance.post('bedtype/', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating bed type:', error);
    throw error; 
  }
};

// Update an existing bed type
const updateBedType = async (id, formData) => {
  try {
    const response = await instance.patch(`bedtype/${id}/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating bed type:', error);
    throw error; 
  }
};

// Delete a bed type
const deleteBedType = async (id) => {
  try {
    await instance.delete(`bedtype/${id}/`);
  } catch (error) {
    console.error('Error deleting bed type:', error);
    throw error; 
  }
};

const BedTypes = {
  getBedType,
  createBedType,
  updateBedType,
  deleteBedType,
};

export default BedTypes;
