import instance from "../utils/Axiox";


export const getAmenities = async () =>{
    try {
        const response = await instance.get('amenities/')
        console.log('catogary rooms are :',response);
        return response.data
    } catch (error) {
        console.error('Error:...',error);
        throw error;

    }
}
export default getAmenities;