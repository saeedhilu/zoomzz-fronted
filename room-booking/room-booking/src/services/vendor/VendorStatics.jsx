import instance from "../../utils/Axiox";

const getSummaryStatics=async ()=>{
    try {
        const response = await instance.get('vendor/vendor-dashboard/')
        console.log('response is ',response.data);
        
        return response.data
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
export default getSummaryStatics;