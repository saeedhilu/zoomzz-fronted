import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BedTypes from "../../services/admin/BedTypes";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";


const BedType = () => {
  const [bedTypes, setBedTypes] = useState([]);
  const [selectedBedType, setSelectedBedType] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const fetchBedTypes = async () => {
    setIsLoading(true);
    try {
      const data = await BedTypes.getBedType();
      setBedTypes(data);
    } catch (error) {
      console.error("Error fetching bed types:", error);
      toast.error("Error fetching bed types");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBedTypes();
  }, []);

  const handleDeleteClick = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await BedTypes.deleteBedType(deleteId);
      setBedTypes(bedTypes.filter((bedType) => bedType.id !== deleteId));
      toast.success(`Bed type "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting bed type:", error);
      toast.error("Error deleting bed type");
    } finally {
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
    }
  };

  const cancelDelete = () => {
    setIsConfirmModalOpen(false);
    setDeleteId(null);
    setDeleteName("");
  };

  const handleCreate = () => {
    setSelectedBedType(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (bedType) => {
    setSelectedBedType(bedType);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name || "");

    try {
      if (isCreating) {
        const data = await BedTypes.createBedType(formDataToSend);
        setBedTypes((prev) => [...prev, data]);
        toast.success(`Bed type ${data.name} created successfully!`);
      } else {
        const updatedData = await BedTypes.updateBedType(
          selectedBedType.id,
          formDataToSend
        );
        setBedTypes(
          bedTypes.map((bedType) =>
            bedType.id === selectedBedType.id ? updatedData : bedType
          )
        );
        toast.success(`Bed type ${updatedData.name} updated successfully!`);
      }
    } catch (error) {
      console.error("Error occurred while processing bed type:", error);
      setErrorMessage(
        `Error occurred while ${isCreating ? "creating" : "updating"} bed type`
      );
      toast.error(`Error occurred while ${isCreating ? "creating" : "updating"} bed type`);
    } finally {
      setIsGenericModalOpen(false);
      setErrorMessage("");
    }
  };

  const modalFields = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Bed Type name",
    },
  ];

  return (
    <main className="p-6">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Bed Types (<span>{bedTypes.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
      </header>

      <section className="mt-4">
        {isLoading ? (
          <h1>Loading......</h1>
        ) : (
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
              {bedTypes.map((bedType, idx) => (
                <tr
                  key={bedType.id}
                  className={`hover:bg-gray-100 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{bedType.id}</td>
                  <td className="py-3 px-4">{bedType.name}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(bedType)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        aria-label={`Edit ${bedType.name}`}
                      >
                        <FaEdit className="w-5 h-5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(bedType.id, bedType.name)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                        aria-label={`Delete ${bedType.name}`}
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
        )}
      </section>

      {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={() => setIsGenericModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedBedType || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Bed Type" : "Edit Bed Type"}
          fields={modalFields}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the bed type "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <ToastContainer />
    </main>
  );
};

export default BedType;
