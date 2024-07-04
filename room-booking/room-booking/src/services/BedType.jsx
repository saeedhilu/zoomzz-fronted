import instance from "../utils/Axiox";


export const getBedType = async () =>{
    try {
        const response = await instance.get('bed-types/')
        console.log('catogary rooms are :',response);
        return response.data
    } catch (error) {
        console.error('Error:...',error);
        throw error;

    }
}
export default getBedType;