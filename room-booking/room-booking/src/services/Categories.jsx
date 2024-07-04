import instance from "../utils/Axiox";


export const getCategories = async () =>{
    try {
        const response = await instance.get('categories/')
        console.log('catogary rooms are :',response);
        return response.data
    } catch (error) {
        console.error('Error:...',error);
        throw error;

    }
}
export default getCategories;