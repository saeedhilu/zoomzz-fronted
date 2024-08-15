import React, { useEffect, useState } from "react";
import Catogary from "../../services/admin/Categary";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import { updateAmenity } from "../../services/admin/Amenity";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const localhost = "http://127.0.0.1:8000/";
  console.log('====================================');
  console.log('',categories);
  console.log('====================================');

  const fetchCategories = async () => {
    try {
      const data = await Catogary.getCategory();
      setCategories(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteClick = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await Catogary.deleteCategory(deleteId);
      setCategories(categories.filter((category) => category.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      setErrorMessage("");
      toast.success(`Category "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.log("Error deleting category:", error);
      setErrorMessage("Error deleting category");
      toast.error("Error deleting category");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
    setIsConfirmModalOpen(false);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };
  const handleSubmit = async (formData) => {
   console.log('====================================');
   console.log('fromdata is catogary:',formData);
   console.log('====================================');
    const formDataToSend = new FormData();

    if (isCreating) {
      if (formData.name) formDataToSend.append("name", formData.name);
      if (formData.image && formData.image instanceof File)formDataToSend.append("image", formData.image);
      try {
        const data = await Catogary.createCategory(formDataToSend, true);
        console.log('====================================');
        console.log('updated data is :',data);
        console.log('====================================');
        setCategories((prev) => [...prev, data]);
        toast.success(`Category ${data.name} created successfully!`);
      } catch (error) {
       
        setErrorMessage("Error occurred while creating category");
        toast.error("Error occurred while creating category");
      }
    } else {
      if (formData.name && formData.name !== selectedCategory.name) {
        formDataToSend.append("name", formData.name);
      }
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append("image", formData.image)
      } 
      try {
        const updatedData = await Catogary.updateCategory(
          selectedCategory.id,
          formDataToSend,
          true
        );
        console.log('====================================');
        console.log('updated data is :',updatedData);
        console.log('====================================');
        setCategories(
          categories.map((category) =>
            category.id === selectedCategory.id ? updatedData : category
          )
        );
        toast.success(`Category ${updatedData.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating category:", error);
        setErrorMessage("Error occurred while saving category");
        toast.error("Error occurred while saving category");
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
      placeholder: "Enter Category name",
    },
    { name: "image", type: "file", label: "Image", accept: "image/*" },
  ];

  return (
    <main className="p-6 ">  
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between w-screen">
        <h1 className="text-3xl font-bold">
          All Categories (<span>{categories.length}</span>)
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
            {categories.map((category, idx) => (
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
                    src={ category.image_url}
                    alt={`${category.name} category`}
                  />
                </td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(category.id, category.name)
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
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
          initialData={selectedCategory || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Category" : "Edit Category"}
          fields={modalFields}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the category "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <ToastContainer />
    </main>
  );
};

export default Categories;
