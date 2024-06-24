import instance from "../utils/Axiox";

const topRatedRoomsService = async ()=>{
      //This service file for listing toprated rooms

    try {
        const response = await instance.get('accounts/rooms/top-rated/');
        return response.data
    } catch (error) {
        console.log('====================================');
        console.log('error are ............',error);
        console.log('====================================');
    }
}
export default topRatedRoomsService;