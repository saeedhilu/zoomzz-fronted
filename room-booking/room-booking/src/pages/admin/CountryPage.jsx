import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import getCountry from "../../services/admin/Country";


const Country = () => {
  const [country, setCountry] = useState([]);
  const localhost = "http://127.0.0.1:8000/";

  const fetchCountry = async () => {
    try {
      const data = await getCountry();
      setCountry(data);
    } catch (error) {
      console.log("error from catogary ", error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);


  return (
    <main className="ml-64 p-6">
      <header>
        <h1 className="text-3xl font-bold border-b-2 border-gray-400 pb-2">
          All Country (<span>{country.length}</span>)
        </h1>
      </header>

      <section className="mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">ID</th>
              
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-wrap">Action</th>
   
            </tr>
          </thead>
          <tbody>
            {country.map((country, idx) => (
              <tr
                key={country.id}
                className={`hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{country.id}</td>
                
                <td className="py-3 px-4">{country.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${country.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${country.name}`}
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

export default Country;
