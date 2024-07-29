import { useEffect, useState } from "react";
import getCatogary from "../../services/admin/Catogary";

const Categories = () => {
  const [catogaries, setCatogaries] = useState([]);

  const fetchCatogaries = async () => {
    try {
      const data = await getCatogary();
      setCatogaries(data);
    } catch (error) {
      console.log("error from catogary ", error);
    }
  };

  useEffect(() => {
    fetchCatogaries();
  }, []);

  return (
    <main className="ml-64">
      <header>
        <h1 className="text-3xl font-bold flex border-b-2 border-gray-400 pb-2">
          All Users (<p>{users.length}</p>)
        </h1>
      </header>
    </main>
  );
};

export default Categories;
