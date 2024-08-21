import { useEffect, useState } from "react";
import getAllUsers from "../../services/vendor/AlllUsers";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getAllUsers();
      console.log("response is :", data);
      setUsers(data);
    } catch (error) {
      console.log("errro from pages:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const colorHandling = (is_active) => {
    return is_active ? "text-green-600" : "text-red-600";
  };



  return (
    <main className="pl-6  max-w-6xl ">
      <header>
        <h1 className="text-3xl font-bold flex border-b-2 border-gray-400 pb-2">
          All Users (<p>{users.length}</p>)
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
                <th className="py-3 px-4 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => {
                const buttonText = user.is_active ? "Block" : "Unblock";
                const buttonColor = user.is_active
                  ? "bg-green-600"
                  : "bg-red-600";

                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-200 ${
                      index % 2 == 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4">{user.username || "-"}</td>
                    <td className="py-3 px-4">{user.phone_number || "-"}</td>
                    <td className="py-3 px-4">{user.email || "NAN"}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${colorHandling(
                        user.is_active
                      )}`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </td>
                    <td className="py-3 px-4 ">
                      {user.is_superuser
                        ? "Admin"
                        : user.is_vendor
                        ? "Vendor"
                        : "User"}
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
export default AllUsers;
