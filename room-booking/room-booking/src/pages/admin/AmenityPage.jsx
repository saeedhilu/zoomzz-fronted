import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  getAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "../../services/admin/Amenity";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const localhost = "http://127.0.0.1:8000/";

  const fetchAmenities = async () => {
    try {
      const data = await getAmenity();
      setAmenities(data);
    } catch (error) {
      console.log("Error fetching amenities:", error);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleDeleteClick = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAmenity(deleteId);
      setAmenities(amenities.filter((amenity) => amenity.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      setErrorMessage("");
      toast.success(`Amenity "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.log("Error deleting amenity:", error);
      setErrorMessage("Error deleting amenity");
      toast.error("Error deleting amenity");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
    setIsConfirmModalOpen(false);
  };

  const handleCreate = () => {
    setSelectedAmenity(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (amenity) => {
    setSelectedAmenity(amenity);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();

    if (isCreating) {
      if (formData.name) formDataToSend.append("name", formData.name);
      if (formData.image && formData.image instanceof File)
        formDataToSend.append("image", formData.image);
      try {
        const data = await createAmenity(formDataToSend, true);
        setAmenities((prev) => [...prev, data]);
        toast.success(`Amenity ${data.name} created successfully!`);
      } catch (error) {
        console.error("Error creating amenity:", error);
        setErrorMessage("Error occurred while creating amenity");
        toast.error("Error occurred while creating amenity");
      }
    } else {
      if (formData.name && formData.name !== selectedAmenity.name) {
        formDataToSend.append("name", formData.name);
      }
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }
      try {
        const updatedData = await updateAmenity(
          selectedAmenity.id,
          formDataToSend,
          true
        );
        setAmenities(
          amenities.map((amenity) =>
            amenity.id === selectedAmenity.id ? updatedData : amenity
          )
        );
        toast.success(`Amenity ${updatedData.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating amenity:", error);
        setErrorMessage("Error occurred while saving amenity");
        toast.error("Error occurred while saving amenity");
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
      placeholder: "Enter Amenity name",
    },
    { name: "image", type: "file", label: "Image", accept: "image/*" },
  ];

  return (
    <main className="p-6">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Amenities (<span>{amenities.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
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
                key={idx}
                className={`hover:bg-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-100" : "bg-white"
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
                      onClick={() => handleEdit(amenity)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${amenity.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(amenity.id, amenity.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${amenity.name}`}
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
          title={isCreating ? "Create Amenity" : "Edit Amenity"}
          onClose={() => setIsGenericModalOpen(false)}
          onSubmit={handleSubmit}
          fields={modalFields}
          initialData={
            selectedAmenity
              ? { name: selectedAmenity.name, image: "" }
              : { name: "", image: "" }
          }
          errorMessage={errorMessage}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the amenity "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <ToastContainer />
    </main>
  );
};

export default Amenities;
