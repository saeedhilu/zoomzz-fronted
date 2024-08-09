import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import instance from "../../utils/Axiox";
import Banners from "../../services/admin/Banners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";

// Banner component
const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const localhost = "http://127.0.0.1:8000/";

  const fetchBanner = async () => {
    try {
      const data = await Banners.getBanner();
      console.log('====================================');
      console.log('data s OL:',data);
      console.log('====================================');
      setBanner(data);
    } catch (error) {
      console.log("error from Banner ", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleCreate = () => {
    setIsGenericModalOpen(true);
    setSelectedData(null);
    setIsCreating(true);
  };

  const handleEdit = (banner) => {
    setIsGenericModalOpen(true);
    setIsCreating(false);
    setSelectedData(banner);
  };

  const confirmDelete =async () => {
    try {
      await Banners.deleteBanner(deleteId)
      setBanner(banner.filter((banner) => banner.id !== deleteId));
      setIsConfirmModalOpen(false)
      setDeleteId(null)
      setDeleteTitle(null)
      toast.success(`Banner ${deleteTitle} deleted Successfully`)
    } catch (error) {
      console.error(error);
      toast.error("Error deleting category");
    }
  };

  const cancelDelete = () => {
    setIsConfirmModalOpen(false);
  };
  const handleDelete=(id,name)=>{
    setDeleteId(id)
    setDeleteTitle(name)
    setIsConfirmModalOpen(true);
  }

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();

    if (isCreating) {
      if (formData.title) formDataToSend.append("title", formData.title);
      if (formData.content) formDataToSend.append("content", formData.content);
      if (formData.btntxt) formDataToSend.append("button_text", formData.btntxt);
      if (formData.image && formData.image instanceof File)formDataToSend.append("image", formData.image);

      try {
        const data = await Banners.createBanner(formDataToSend,true);
        setBanner((prev) => [...prev, data]);
        toast.success(`Banner ${data.name} created successfully!`);
      } catch (error) {
        console.log("Error is :", error);
      }
    } else {
      console.log('====================================');
      console.log('from, babder:',formData);
      console.log('====================================');
      if (formData.title !== selectedData.title) {
        formDataToSend.append("title", formData.title);
      }
      
      if (formData.btn_text !== selectedData.btn_text) {
        formDataToSend.append("btn_text", formData.btn_text);
      }
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append("image", formData.image)
      } 
      try {
        const data = await Banners.updateBanner(selectedData.id, formDataToSend, true);
        setBanner((prev) =>
          prev.map((item) => (item.id === selectedData.id ? data : item))
        );
        toast.success(`Banner ${formDataToSend.name} updated successfully!`);
      } catch (error) {
        console.log("skjgh", error);
      }
    }
  };

  const modalFields = [
    {
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Enter Banner Title",
    },
   
    {
      name: "btntxt",
      type: "text",
      label: "Button Text",
      placeholder: "Enter Button Text",
    },
    { name: "image", type: "file", label: "Image", accept: "image/*" },
  ];

  return (
    <main className="">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">Banner Management</h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
      </header>

      <section className="mt-4 overflow-y-auto h-[calc(100vh-125px)]  ">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              
              <th className="py-3 px-4 text-left">Button Text</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {banner.map((banner, idx) => (
              <tr
                key={banner.id}
                className={`hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{banner.id}</td>
                <td className="py-3 px-4">
                  <img
                    className="w-32 h-20 rounded-lg cursor-pointer"
                    src={localhost + banner.image}
                    alt={banner.title}
                    onClick={() => handleImageClick(banner.image)}
                  />
                </td>
                <td className="py-3 px-4">{banner.title}</td>
                <td className="py-3 px-4">{banner.button_text}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      aria-label={`Edit ${banner.title}`}
                      onClick={() => handleEdit(banner)}
                    >
                      <FaEdit className="w-5 h-5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      aria-label={`Delete ${banner.title}`}
                      onClick={() => handleDelete(banner.id,banner.title)}
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
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2  p-2 rounded-full hover:bg-gray-200"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img
              className="max-w-screen-sm max-h-screen"
              src={localhost + selectedImage}
              alt="Full-size view"
            />
          </div>
        </div>
      )}
      {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={() => setIsGenericModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedData || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Banner" : "Edit Banner"}
          fields={modalFields}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the Banner "${deleteTitle}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer />
    </main>
  );
};

export default Banner;