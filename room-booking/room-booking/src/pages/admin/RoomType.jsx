import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RoomTypes from "../../services/admin/RoomTypes";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const localhost = "http://127.0.0.1:8000/";

  const fetchRoomTypes = async () => {
    try {
      const data = await RoomTypes.getRoomType();
      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleDeleteClick = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await RoomTypes.deleteRoomsType(deleteId);
      setRoomTypes(roomTypes.filter((roomType) => roomType.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      toast.success(`Room type "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting room type:", error);
      toast.error("Error deleting room type");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
    setIsConfirmModalOpen(false);
  };

  const handleCreate = () => {
    setSelectedRoomType(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (roomType) => {
    setSelectedRoomType(roomType);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();

    if (isCreating) {
      if (formData.name) formDataToSend.append("name", formData.name);
      try {
        const data = await RoomTypes.createRoomsType(formDataToSend);
        setRoomTypes((prev) => [...prev, data]);
        toast.success(`Room type ${data.name} created successfully!`);
      } catch (error) {
        
        setErrorMessage("Error occurred while creating room type");
        toast.error("Error occurred while creating room type");
      }
    } else {
      if (formData.name && formData.name !== selectedRoomType.name) {
        formDataToSend.append("name", formData.name);
      }
      try {
        const updatedData = await RoomTypes.updateRoomsType(
          selectedRoomType.id,
          formDataToSend
        );
        setRoomTypes(
          roomTypes.map((roomType) =>
            roomType.id === selectedRoomType.id ? updatedData : roomType
          )
        );
        toast.success(`Room type ${updatedData.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating room type:", error);
        setErrorMessage("Error occurred while updating room type");
        toast.error("Error occurred while updating room type");
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
      placeholder: "Enter Room Type name",
    },
  ];

  return (
    <main className="p-6">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Room Types (<span>{roomTypes.length}</span>)
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
            {roomTypes.map((roomType, idx) => (
              <tr
                key={roomType.id}
                className={`hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{roomType.id}</td>
                <td className="py-3 px-4">{roomType.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(roomType)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${roomType.name}`}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(roomType.id, roomType.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${roomType.name}`}
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
          initialData={selectedRoomType || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Room Type" : "Edit Room Type"}
          fields={modalFields}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the room type "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <ToastContainer />
    </main>
  );
};

export default RoomType;
