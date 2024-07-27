import instance from "../../utils/Axiox"

const getAllusers= async ()=>{
    try {
        const response =await instance.get('Users-listing/')
        console.log('====================================');
        console.log('from all users :',response);
        console.log('====================================');
        return response.data
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
export default getAllusers;