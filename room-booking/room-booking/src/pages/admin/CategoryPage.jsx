import { useEffect, useState } from "react";
import Catogary from "../../services/admin/Catogary";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Categories = () => {
  const [catogaries, setCatogaries] = useState([]);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // New state for creating
  const [errorMessage, setErrorMessage] = useState("");
  const localhost = "http://127.0.0.1:8000/";

  const fetchCatogaries = async () => {
    try {
      const data = await Catogary.getCategory();
      setCatogaries(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCatogaries();
  }, []);

  const catogaryDeleting = async (id) => {
    try {
      await Catogary.deleteCategory(id);
      setCatogaries(catogaries.filter((category) => category.id !== id));
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const catoaryEditing = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, image: "" });
    setIsCreating(false);
    setIsModalOpen(true);
    setErrorMessage("");
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setFormData({ name: "", image: "" });
    setIsCreating(true);
    setIsModalOpen(true);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {};

    try {
      if (isCreating) {
        

        if (formData.name) {
          updatedFields.name = formData.name;
        }

        if (formData.image) {
          updatedFields.image = formData.image;
        }
        const data = await Catogary.createCategory(
          
          updatedFields
        );
        console.log(data);
        
        setCatogaries((pre)=> [...pre,data])




      } else {
        if (formData.name !== selectedCategory.name) {
          updatedFields.name = formData.name;
        }

        if (formData.image) {
          updatedFields.image = formData.image;
        }
        const updatedData = await Catogary.updateCategory(
          selectedCategory.id,
          updatedFields
        );
        setCatogaries(
          catogaries.map((category) =>
            category.id === selectedCategory.id ? updatedData : category
          )
        );
      }
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <main className="p-6">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Categories (<span>{catogaries.length}</span>)
        </h1>
        <button
          className="bg-gray-600 p-3 rounded-lg text-white hover:bg-gray-800"
          onClick={handleCreate}
        >
          Add New +
        </button>
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
            {catogaries.map((category, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{category.id}</td>
                <td className="py-3 px-4">
                  <img
                    className="w-16 h-12 rounded-lg object-cover"
                    src={localhost + category.image}
                    alt={`${category.name} category`}
                  />
                </td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => catoaryEditing(category)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${category.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => catogaryDeleting(category.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${category.name}`}
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

      {isModalOpen && (
        <section>
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900/50">
            <article className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-lg font-bold text-gray-900">
                {isCreating ? "Create Category" : "Edit Category"}
              </h2>
              <form onSubmit={handleSubmit} className="mt-4">
                {errorMessage && (
                  <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
                    {errorMessage}
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700">
                    Image
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    {isCreating ? "Create" : "Update"}
                  </button>
                </div>
              </form>
            </article>
          </div>
        </section>
      )}
    </main>
  );
};

export default Categories;
