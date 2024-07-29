import instance from "../../utils/Axiox"




const getAmenity=async () =>{
    try {
        const response = await instance.get('amenity/')
        return response.data
        
    } catch (error) {
        console.log('errpor ', error);
    }
}
export default getAmenity;