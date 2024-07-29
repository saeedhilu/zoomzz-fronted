import { useEffect, useState } from "react";
import getAllusers from "../../services/admin/Allusers";

const Allguests = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAllusers();
      setUsers(data);
      console.log("Fetched users:", data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colorHandling = (is_active) => {
    return is_active ? 'text-green-600' : 'text-red-600';
  };

  const handleBlockToggle = (userId) => {
    // Implement the functionality to block or unblock a user here
    console.log(`Toggle block status for user with ID: ${userId}`);
  };

  const getTextClass = (value) => {
    return !value ? 'text-center' : '';
  };

  return (
    <main className="ml-64 pl-6 mx-auto max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold border-b-2 border-gray-400 pb-2">
          All Users
        </h1>
       
      </header>
      <section className="overflow-x-auto mt-4">
        <div className="overflow-y-auto h-[calc(100vh-110px)]"> 
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-10 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => {
                const buttonText = user.is_active ? 'Block' : 'Unblock';
                const buttonColor = user.is_active ? 'bg-green-600' : 'bg-red-600';

                return (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.id}</td>
                    <td className={`py-3 px-4 ${getTextClass(user.username)}`}>{user.username || '-'}</td>
                    <td className={`py-3 px-4 ${getTextClass(user.phone_number)}`}>{user.phone_number || '-'}</td>
                    <td className={`py-3 px-4 ${getTextClass(user.email)}`}>{user.email || '-'}</td>
                    <td className={`py-3 px-4 font-semibold ${colorHandling(user.is_active)}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleBlockToggle(user.id)}
                        className={`px-4 py-2 text-white w-24 rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out ${buttonColor}`}
                      >
                        {buttonText}
                      </button>
                    </td>
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

export default Allguests;
