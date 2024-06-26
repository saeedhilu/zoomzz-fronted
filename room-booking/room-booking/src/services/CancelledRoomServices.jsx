import instance from "../utils/Axiox";


export const getCanceledRooms = async () =>{
    try {
        const response = await instance.get('accounts/canceled-rooms/')
        console.log('cancelled rooms are :',response);
        return response.data
    } catch (error) {
        console.error('Error:...',error);
        throw error;

    }
}
export default getCanceledRooms;