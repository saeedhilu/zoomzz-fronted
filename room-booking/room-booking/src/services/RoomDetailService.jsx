import instance from "../utils/Axiox";

const getRoomDetails = async (roomId) => {
    try {
        const response = await instance.get(`/accounts/room-detail/${roomId}/`);
        {console.log(response);}
        return response.data;
    } catch (error) {
        console.error('Error!!!..', error);
        throw error;
    }
}

export default getRoomDetails;