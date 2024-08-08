import instance from "../../utils/Axiox"

const getAllUsers=async () =>{
    try {
        const response   =await instance.get('/vendor/all-users/')
        console.log('response for All users',response);
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
export default getAllUsers;