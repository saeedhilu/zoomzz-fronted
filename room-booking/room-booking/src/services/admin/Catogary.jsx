import instance from "../../utils/Axiox"




const getCatogary=async () =>{
    try {
        const response = await instance.get('category/')
        return response.data
        
    } catch (error) {
        console.log('errpor ', error);
    }
}
export default getCatogary;