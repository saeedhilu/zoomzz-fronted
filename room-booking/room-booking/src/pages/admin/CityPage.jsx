import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Cities from "../../services/admin/Cities";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import ConfirmationModal from "../../components/common/admin/ConfirmModal"; // Assuming you need a confirmation modal for delete
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const City = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCity = async () => {
    try {
      const data = await Cities.getCity();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCity();
  }, []);

  const handleCreate = () => {
    setSelectedCity(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (city) => {
    setSelectedCity(city);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleDeleteClick = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await Cities.deleteCity(deleteId);
      setCities(cities.filter((city) => city.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      toast.success(`City "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting city:", error);
      toast.error("Error deleting city");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
    setIsConfirmModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();
    if (formData.name) formDataToSend.append("name", formData.name);

    if (isCreating) {
      try {
        const data = await Cities.createCity(formDataToSend);
        setCities((prev) => [...prev, data]);
        toast.success(`City ${data.name} created successfully!`);
      } catch (error) {
        console.error("Error creating city:", error);
        setErrorMessage("Error occurred while creating city");
        toast.error("Error occurred while creating city");
      }
    } else {
      try {
        const updatedData = await Cities.updateCity(selectedCity.id, formDataToSend);
        setCities(
          cities.map((city) =>
            city.id === selectedCity.id ? updatedData : city
          )
        );
        toast.success(`City ${updatedData.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating city:", error);
        setErrorMessage("Error occurred while updating city");
        toast.error("Error occurred while updating city");
      }
    }

    setIsGenericModalOpen(false);
    setErrorMessage("");
  };

  const modalFields = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter City name",
    },
  ];

  return (
    <main className="p-6">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Cities (<span>{cities.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
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
            {cities.map((city, idx) => (
              <tr
                key={city.id}
                className={`hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{city.id}</td>
                <td className="py-3 px-4">{city.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(city)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${city.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(city.id, city.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${city.name}`}
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

      {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={() => setIsGenericModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedCity || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New City" : "Edit City"}
          fields={modalFields}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the city "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
       <ToastContainer />
    </main>
  );
};

export default City;
