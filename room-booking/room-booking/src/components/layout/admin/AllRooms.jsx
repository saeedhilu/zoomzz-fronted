import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAllRooms from "../../../services/admin/AllroomsServices";

const AllRooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllRooms();
        setData(response.rooms);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setError("Failed to fetch rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusClass = (availability) => {
    return availability ? 'text-green-700' : 'text-red-600';
  };

  const handleViewClick = (id) => {
    console.log("View button clicked", id);
    navigate(`/room-details/${id}`);
  };

  return (
    <main className="p-6 mx-auto max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-400 pb-2">All Rooms</h1>
      </header>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <section className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Room Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Vendor Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((room) => (
                <tr key={room.id} className="hover:bg-gray-100">
                  <td className="py-3 px-4">{room.id}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img className="w-16 h-12 rounded-lg" src={room.image} alt={`${room.name} room`} />
                    {room.name}
                  </td>
                  <td className="py-3 px-4">{room.category.name}</td>
                  <td className="py-3 px-4">{room.created_by}</td>
                  <td className="py-3 px-4">{room.location.city}, {room.location.country}</td>
                  <td className="py-3 px-4">{room.price_per_night}</td>
                  <td className={`py-3 px-4 font-semibold ${getStatusClass(room.availability)}`}>
                    {room.availability ? 'Active' : 'Inactive'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleViewClick(room.id)}
                      className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
};

export default AllRooms;
