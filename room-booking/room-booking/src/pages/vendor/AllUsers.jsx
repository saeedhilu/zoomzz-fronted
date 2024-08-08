import { useEffect } from "react";
import getAllUsers from "../../services/vendor/AlllUsers";

const AllUsers = () => {
  const fetchData = async () => {
    try {
      const data = await getAllUsers();
      console.log('response is :',data);
      
    } catch (error) {
      console.log("errro from pages:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <header>
        <h1 className="text-3xl font-bold flex border-b-2 border-gray-400 pb-2">
          All Users (<p>{users.length}</p>)
        </h1>
      </header>
    </main>
  );
};
export default AllUsers;
