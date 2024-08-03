import { useEffect, useState } from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import getAmenity from "../../services/admin/Amenity";
// This section for amenity
const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const localhost = "http://127.0.0.1:8000/";

  const fetchAmenity = async () => {
    try {
      const data = await getAmenity();
      setAmenities(data);
    } catch (error) {
      console.log("error from catogary ", error);
    }
  };

  useEffect(() => {
    fetchAmenity();
  }, []);



  return (
    <main className=" p-6">
      <header>
        <h1 className="text-3xl font-bold border-b-2 border-gray-400 pb-2">
          All Amenity (<span>{amenities.length}</span>)
        </h1>
      </header>

      <section className="mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-wrap">Action</th>
   
            </tr>
          </thead>
          <tbody>
            {amenities.map((amenity, idx) => (
              <tr
                key={amenity.id}
                className={`hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{amenity.id}</td>
                <td className="py-3 px-4">
                  <img
                    className="w-16 h-12 rounded-lg object-cover"
                    src={localhost + amenity.image}
                    alt={`${amenity.name} amenity`}
                  />
                </td>
                <td className="py-3 px-4">{amenity.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${amenity.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${amenity .name}`}
                    >
                      <FaTrashAlt className="w-5 h-5" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Amenity;
