import instance from "../../utils/Axiox"




const getCountry=async () =>{
    try {
        const response = await instance.get('country/')
        console.log('cities i s:',response.data);
        return response.data
        
    } catch (error) {
        console.log('errpor ', error);
    }
}
export default getCountry;