import instance from "../../utils/Axiox";

const getTopVendors=async ()=>{
    try {
        const response = await instance.get('top-vendors/');
        return response.data
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
export default getTopVendors;