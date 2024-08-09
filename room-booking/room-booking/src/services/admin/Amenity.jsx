import instance from "../../utils/Axiox"


// Change this for Vendor listign based on Permssion

const getAmenity=async () =>{
    try {
        const response = await instance.get('amenities/')
        return response.data
        
    } catch (error) {
        console.log('errpor ', error);
    }
}



const createAmenity = async (data) => {
    console.log('post data is :',data);
  try {
    const response = await instance.post('amenity/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating amenity:', error);
    throw error;
  }
};

const updateAmenity = async (id, data) => {
  try {
    const response = await instance.patch(`amenity/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating amenity:', error);
    throw error;
  }
};

const deleteAmenity = async (id) => {
    try {
      const response = await instance.delete(`amenity/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting amenity:", error);
      throw error;
    }
  };
  

export {
  createAmenity,
  updateAmenity,
  getAmenity,
  deleteAmenity
};
