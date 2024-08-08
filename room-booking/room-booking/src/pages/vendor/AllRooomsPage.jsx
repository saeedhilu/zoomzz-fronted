import { useEffect, useState } from "react";
import AllRoomsServices from "../../services/vendor/AllRoomsServices";
import AddNewButton from "../../components/common/admin/AddNewButton";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const localHost = "http://127.0.0.1:8000/";

  const fetchRooms = async () => {
    try {
      const response = await AllRoomsServices.getRooms();
      console.log("all rooms", response);
      setRooms(response); // Adjust according to the actual structure of your response
    } catch (error) {
      console.log("Error from all rooms", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreate = () => {
    alert("create button is clicked...");
  };

  return (
    <main className="pl-1 pt-2 mx-auto max-w-6xl">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Rooms (<span>{rooms.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
      </header>
      <section className="overflow-x-auto mt-4">
        <div className="overflow-y-auto h-[calc(100vh-110px)]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
              <th className=" py-4 px-2 border-b">#</th>
              <th className=" py-4 px-2 border-b">Name</th>
              <th className=" py-4 px-2 border-b">Description</th>
              <th className=" py-4 px-2 border-b">Price Per Night</th>
              <th className=" py-4 px-2 border-b">Category</th>
              <th className=" py-4 px-2 border-b">Location</th>
              <th className=" py-4 px-2 border-b">Availability</th>
              <th className=" py-4 px-2 border-b">Pet Allowed</th>
              <th className=" py-4 px-2 border-b">Max Occupancy</th>
              <th className=" py-4 px-2 border-b">Images</th>
              <th className=" py-4 px-2 border-b">RoomType</th>
              <th className=" py-4 px-2 border-b">Amenities</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room,idx) => {
              const {
                id,
                name,
                description,
                price_per_night,
                category,
                location,
                availability,
                pet_allowed,
                max_occupancy,
                image,
                image2,
                image3,
                image4,
                image5,
                room_type,
                amenities
              } = room;

              return (
                <tr key={id} className={`${idx % 2 == 0 ?'bg-white':'bg-gray-100'} hover:bg-gray-200`}>
                  <td className=" py-4 px-2 border-b">{idx+1}</td>
                  <td className=" py-4 px-2 border-b">{name}</td>
                  <td className=" py-4 px-2 border-b">{description}</td>
                  <td className=" py-4 px-2 border-b">{price_per_night}</td>
                  <td className=" py-4 px-2 border-b">{category.name}</td>
                  <td className=" py-4 px-2 border-b">
                    {location.name}, {location.city}, {location.country}
                  </td>
                  <td className=" py-4 px-2 border-b">
                    {availability ? "Available" : "Not Available"}
                  </td>
                  <td className=" py-4 px-2 border-b">
                    {pet_allowed ? "Yes" : "No"}
                  </td>
                  <td className=" py-4 px-2 border-b">{max_occupancy}</td>
                  <td className=" py-4 px-2 border-b flex flex-wrap gap-2">
                    <img
                      src={localHost + image}
                      alt="room"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    {image2 &&  (
                      <img
                        src={localHost +image2}
                        alt="room"
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )}
                    {image3 && (
                      <img
                        src={localHost +image3}
                        alt="room"
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )}
                    {image4 && (
                      <img
                        src={localHost +image4}
                        alt="room"
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )}
                    {image5 && (
                      <img
                        src={localHost +image5}
                        alt="room"
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )}
                  </td>
                  <td className=" py-4 px-2 border-b">{room_type}</td>
                  <td className=" py-4 px-2 border-b">{amenities}</td>

                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AllRooms;
