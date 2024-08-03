import instance from "../../utils/Axiox";

const getSummaryStatics=async ()=>{
    try {
        const response = await instance.get('accounts/summary-statistics/')
        return response.data
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
export default getSummaryStatics;