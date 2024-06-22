import instance from "../utils/Axiox";



export const searchRooms = async (serachParams) =>{
    try {
        const params = new URLSearchParams(serachParams).toString();
        {console.log('param are   :',params);}
        const response = await instance.get(`accounts/room-search/?${params}`);
        {console.log('====================================');
        console.log('data  fetching  from backend   ',response.data.results);
        console.log('====================================');}
        return response.data.results;
    } catch (error) {
        console.log('error fetching from bg',error);
        throw error;
    }
};
export default searchRooms;