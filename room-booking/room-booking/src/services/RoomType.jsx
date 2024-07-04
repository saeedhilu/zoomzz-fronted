import instance from "../utils/Axiox";


export const getRoomType = async () =>{
    try {
        const response = await instance.get('room-types/')
        console.log('catogary rooms are :',response);
        return response.data
    } catch (error) {
        console.error('Error:...',error);
        throw error;

    }
}
export default getRoomType;