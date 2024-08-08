import { useEffect } from "react";
import AllRoomsServices from "../../services/vendor/AllRoomsServices";

const AllRooms=()=>{

    const fetchRooms=async()=>{
        try {
            const response = await AllRoomsServices.getRooms()
            console.log('all rooms',response);
            
        } catch (error) {
            console.log('Eroor from all rooms',error);
            
        }
    }
    useEffect(()=>{
        fetchRooms()
    })



    return (
        <div>
            <h1>Rooms</h1>
        </div>
    )
}
export default AllRooms;