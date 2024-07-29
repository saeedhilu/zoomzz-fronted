import instance from "../../utils/Axiox"




const getCity=async () =>{
    try {
        const response = await instance.get('cities/')
        console.log('cities i s:',response.data);
        return response.data
        
    } catch (error) {
        console.log('errpor ', error);
    }
}
export default getCity;