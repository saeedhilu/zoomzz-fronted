import instance from "../../utils/Axiox";

const getTopVendors=async ()=>{
    try {
        const response = await instance.get('vendor/top-rooms/');
        console.log('response data from top rooms',response);
        
        return response.data
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
export default getTopVendors;