import instance from "../../utils/Axiox"




const getBedType=async () =>{
    try {
        const response = await instance.get('bedtype/')
        return response.data
        
    } catch (error) {
        console.log('errpor ', error);
    }
}
export default getBedType;