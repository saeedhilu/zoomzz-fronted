import React, { useEffect, useState } from "react";
import getCanceledRooms from "../../services/CancelledRoomServices";


const CanceledRooms=()=>{
    const [canceledRooms,setCanceledRooms] = useState([]);

    const fetchCanceledRooms = async () =>{
        try {
            const data = await getCanceledRooms();
            {console.log('====================================');
            console.log('cancled room from setting ..',data);
            console.log('====================================');}
            setCanceledRooms(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchCanceledRooms();
    },[]);

    return(
        <div>
            <h2>Cancelled Rooms</h2>
            <ul>
                {canceledRooms.map(room =>(
                    <li key={id}>
                        {room.room_name} 
                    </li>
                ))}
            </ul>
        </div>
    )

}


export default CanceledRooms;