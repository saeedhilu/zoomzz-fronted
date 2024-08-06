import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Countrys from "../../services/admin/Countrys";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import ConfirmationModal from "../../components/common/admin/ConfirmModal"; // Assuming you need a confirmation modal for delete
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCountry = async () => {
    try {
      const data = await Countrys.getCountry();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleCreate = () => {
    setSelectedCountry(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (country) => {
    setSelectedCountry(country);
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
      await Countrys.deleteCountry(deleteId);
      setCountries(countries.filter((country) => country.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      toast.success(`Country "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting country:", error);
      toast.error("Error deleting country");
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
        const data = await Countrys.createCountry(formDataToSend);
        setCountries((prev) => [...prev, data]);
        toast.success(`Country ${data.name} created successfully!`);
      } catch (error) {
        console.error("Error creating country:", error);
        setErrorMessage("Error occurred while creating country");
        toast.error("Error occurred while creating country");
      }
    } else {
      try {
        const updatedData = await Countrys.updateCountry(selectedCountry.id, formDataToSend);
        setCountries(
          countries.map((country) =>
            country.id === selectedCountry.id ? updatedData : country
          )
        );
        toast.success(`Country ${updatedData.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating country:", error);
        setErrorMessage("Error occurred while updating country");
        toast.error("Error occurred while updating country");
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
      placeholder: "Enter Country name",
    },
  ];

  return (
    <main className="p-6">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Countries (<span>{countries.length}</span>)
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
            {countries.map((country, idx) => (
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
                      onClick={() => handleEdit(country)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${country.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(country.id, country.name)}
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

      {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={() => setIsGenericModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedCountry || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Country" : "Edit Country"}
          fields={modalFields}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the country "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer/>
    </main>
  );
};

export default Country;
