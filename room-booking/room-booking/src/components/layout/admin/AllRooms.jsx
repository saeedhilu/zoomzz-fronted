import { useEffect, useState } from "react";
import getAllRooms from "../../../services/admin/AllroomsServices";

const AllRooms = () => {
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getAllRooms();
      setdata(response.rooms);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
console.log('====================================');
console.log('sa',data);
console.log('====================================');

  return (
    <div>
        <span className="text-xl font-semibold border-b  border-b-4 border-gray-700 ">All Rooms</span>
      <div>
        {data.map((room,index)=>(
            <div key={index}>
                <h1>{room.name}</h1>
            </div>
        ))}
      </div>
    </div>
  );
};
export default AllRooms;
