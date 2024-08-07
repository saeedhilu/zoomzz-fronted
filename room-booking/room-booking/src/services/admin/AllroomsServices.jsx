import instance from "../../utils/Axiox";


const getAllRooms= async ()=>{
    try {
        const response  =  await instance.get('/all-room-listing/')
        console.log('====================================');
        console.log('response for room listing ',response);
        console.log('====================================');
        return response.data        
    } catch (error) {
        console.log('====================================');
        console.log('error from all rooms',error);
        console.log('====================================');
    }
}
export default getAllRooms;