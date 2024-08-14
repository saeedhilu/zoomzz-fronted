// import { useEffect, useState } from "react";
// import AllRoomsServices from "../../services/vendor/AllRoomsServices";
// import AddNewButton from "../../components/common/admin/AddNewButton";
// import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ConfirmationModal from "../../components/common/admin/ConfirmModal";
// import GenericModal from "../../components/common/admin/GenericModal";
// import { getAmenity } from "../../services/admin/Amenity";
// import Countrys from "../../services/admin/Countrys";
// import getCountry from "../../services/vendor/Country";
// import getCity from "../../services/vendor/City";

// const RoomImage = ({ imageSrc, onClick }) => (
//   <img
//     src={imageSrc}
//     alt="room"
//     className="w-10 h-10 object-cover rounded-lg"
//     onClick={() => onClick(imageSrc)}
//   />
// );

// const AllRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [imageShow, setImageShow] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
//   const localHost = "http://127.0.0.1:8000/";
//   const [deleteId, setDeleteId] = useState(null);
//   const [deleteName, setDeleteName] = useState("");
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [amenitiesState, setAmenities] = useState([]);
//   const [country, setCountries] = useState([]);
//   const [city, setCities] = useState([]);
//   console.log(
//     "selected dat ",
//   );

//   const fetchRooms = async () => {
//     try {
//       const response = await AllRoomsServices.getRooms();
//       console.log("all rooms", response);
//       setRooms(response);
//     } catch (error) {
//       console.log("Error from all rooms", error);
//     }
//   };

//   const fetchAmenities = async () => {
//     try {
//       const data = await getAmenity();
//       setAmenities(data);
//     } catch (error) {
//       console.log("Error fetching amenities:", error);
//     }
//   };
//   console.log(" amernities are :", amenitiesState);
//   const fetchCountry = async () => {
//     try {
//       const data = await getCountry();
//       console.log(" All country is ", data);

//       setCountries(data);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };
//   const fetchCity = async () => {
//     try {
//       const data = await getCity();
//       console.log(" All country is ", data);

//       setCities(data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };
//   useEffect(() => {
//     fetchRooms();
//     fetchAmenities();
//     fetchCountry();
//     fetchCity();
//   }, []);

//   const handleCreate = () => {
//     setIsCreating(true);
//     setIsGenericModalOpen(true);
//     // setErrorMessage("");
//   };

//   const handleImageClick = (image) => {
//     setImageShow(true);
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setImageShow(false);
//   };
//   const handleEdit = (room) => {
//     setIsGenericModalOpen(true);
//     setIsCreating(false);
//   };
//   const handleDelete = (id, name) => {
//     setDeleteId(id);
//     setDeleteName(name);
//     setIsConfirmModalOpen(true);
//   };

//   const handleSubmit = async (formData) => {

//     const formDataToSend = new FormData();

//     if (isCreating) {
//       if (formData.name) formDataToSend.append("name", formData.name);
//       if (formData.image && formData.image instanceof File)formDataToSend.append("image", formData.image);
//       try {
//         const data = await Catogary.createRoom(formDataToSend, true);
//         setRoom((prev) => [...prev, data]);
//         toast.success(`Room ${data.name} created successfully!`);
//       } catch (error) {

//         setErrorMessage("Error occurred while creating Room");
//         toast.error("Error occurred while creating Room");
//       }
//     } else {
//       if (formData.name && formData.name !== selectedRoom.name) {
//         formDataToSend.append("name", formData.name);
//       }
//       if (formData.image && formData.image instanceof File) {
//         formDataToSend.append("image", formData.image)
//       }
//       try {
//         const updatedData = await Catogary.updateRoom(
//           selectedRoom.id,
//           formDataToSend,
//           true
//         );
//         setRoom(
//           categories.map((Room) =>
//             Room.id === selectedRoom.id ? updatedData : Room
//           )
//         );
//         toast.success(`Room ${updatedData.name} updated successfully!`);
//       } catch (error) {
//         console.error("Error updating Room:", error);
//         setErrorMessage("Error occurred while saving Room");
//         toast.error("Error occurred while saving Room");
//       }
//     }
//     setIsGenericModalOpen(false);
//     setErrorMessage("");
//   };

//   const confirmDelete = async () => {
//     try {
//       await AllRoomsServices.deleteRooms(deleteId);
//       setBanner(rooms.filter((rooms) => rooms.id !== deleteId));
//       setIsConfirmModalOpen(false);
//       setDeleteId(null);
//       setDeleteName(null);
//       toast.success(`Room ${deleteName} deleted Successfully`);
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting Room");
//     }
//   };

//   const cancelDelete = () => {
//     setIsConfirmModalOpen(false);
//   };
//   const modalFields = [
//     {
//       name: "name",
//       type: "text",
//       label: "Room Name",
//       placeholder: "Enter Room Name",
//     },
//     {
//       name: "description",
//       type: "textarea",
//       label: "Description",
//       placeholder: "Enter Room Description",
//     },
//     {
//       name: "price_per_night",
//       type: "number",
//       label: "Price per Night",
//       placeholder: "Enter Price per Night",
//     },
//     {
//       name: "availability",
//       type: "checkbox",
//       label: "Availability",
//     },
//     // {
//     //   name: "bed_type",
//     //   type: "text",
//     //   label: "Bed Type",
//     //   placeholder: "Enter Bed Type",
//     // },
//     // {
//     //   name: "room_type",
//     //   type: "text",
//     //   label: "Room Type",
//     //   placeholder: "Enter Room Type",
//     // },
//     {
//       name: "max_occupancy",
//       type: "number",
//       label: "Max Occupancy",
//       placeholder: "Enter Maximum Occupancy",
//     },
//     {
//       name: "pet_allowed",
//       type: "checkbox",
//       label: "Pet Allowed",
//     },
//     // {
//     //   name: "Room",
//     //   type: "text",
//     //   label: "Room",
//     //   placeholder: "Enter Room",
//     // },
//     {
//       name: "google_map_url",
//       type: "url",
//       label: "Google Map URL",
//       placeholder: "Enter Google Map URL",
//     },
//     // {
//     //   name: "location",
//     //   type: "text",
//     //   label: "Location",
//     //   placeholder: "Enter Location (City, Country)",
//     // },
//     // {
//     //   name: "city",
//     //   type: "text",
//     //   label: "City",
//     //   placeholder: "Enter Location (City)",
//     // },
//     {
//       name: "created_at",
//       type: "text",
//       label: "Created At",
//       placeholder: "Creation Date",
//       disabled: true,
//     },
//     // {
//     //   name: "amenities",
//     //   type: "checkbox-group",
//     //   label: "Amenities",
//     //   options:
//     //     amenitiesState?.map((amenity) => ({
//     //       value: amenity.id,
//     //       label: amenity.name,
//     //     })) || [],
//     // },
//     // {
//     //   name: "image",
//     //   type: "file",
//     //   label: "Room Image",
//     //   placeholder: "Upload Room Image",
//     // },
//     // {
//     //   name: "image2",
//     //   type: "file",
//     //   label: "Additional Image 1",
//     //   placeholder: "Upload Additional Image 1",
//     // },
//     // {
//     //   name: "image3",
//     //   type: "file",
//     //   label: "Additional Image 2",
//     //   placeholder: "Upload Additional Image 2",
//     // },
//     // {
//     //   name: "image4",
//     //   type: "file",
//     //   label: "Additional Image 3",
//     //   placeholder: "Upload Additional Image 3",
//     // },
//     // {
//     //   name: "image5",
//     //   type: "file",
//     //   label: "Additional Image 4",
//     //   placeholder: "Upload Additional Image 4",
//     // },
//   ];

//   return (
//     <main className="pl-1 pt-2 mx-auto max-w-6xl">
//       <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
//         <h1 className="text-3xl font-bold">
//           All Rooms (<span>{rooms.length}</span>)
//         </h1>
//         <AddNewButton onClick={handleCreate} label="Add New +" />
//       </header>
//       <section className="overflow-x-auto mt-4">
//         <div className="overflow-y-auto h-[calc(100vh-110px)]">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//             <thead className="bg-gray-800 text-white sticky top-0 z-10">
//               <tr>
//                 <th className=" py-4 px-4 border-b">#</th>
//                 <th className=" py-4 px-4 border-b">Name</th>
//                 <th className=" py-4 px-4 border-b">Description</th>
//                 <th className=" py-4 px-4 border-b truncate">Price Per Night</th>
//                 <th className=" py-4 px-4 border-b">Room</th>
//                 <th className=" py-4 px-4 border-b">Location</th>
//                 <th className=" py-4 px-4 border-b">Availability</th>
//                 <th className=" py-4 px-4 border-b truncate">Pet Allowed</th>
//                 <th className=" py-4 px-4 border-b truncate">Max Occupancy</th>
//                 <th className=" py-4 px-4 border-b">Images</th>
//                 <th className=" py-4 px-4 border-b">RoomType</th>
//                 <th className=" py-4 px-4 border-b">Amenities</th>
//                 <th className="py-3 px-4 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rooms.map((room, idx) => {
//                 const {
//                   id,
//                   name,
//                   description,
//                   price_per_night,
//                   Room,
//                   location,
//                   availability,
//                   pet_allowed,
//                   max_occupancy,
//                   room_type,
//                   amenities,
//                 } = room;

//                 const images = [
//                   room.image,
//                   room.image2,
//                   room.image3,
//                   room.image4,
//                   room.image5,
//                 ].filter(Boolean);

//                 return (
//                   <tr
//                     key={id}
//                     className={`${
//                       idx % 2 === 0 ? "bg-white" : "bg-gray-100"
//                     } hover:bg-gray-200`}
//                   >
//                     <td className=" py-4 px-4 border-b">{idx + 1}</td>
//                     <td className=" py-4 px-4 border-b">{name}</td>
//                     <td className=" py-4 px-4 border-b">{description}</td>
//                     <td className=" py-4 px-4 border-b">{price_per_night}</td>
//                     <td className=" py-4 px-4 border-b">{Room.name}</td>
//                     <td className=" py-4 px-4 border-b">
//                       {location.name}, {location.city}, {location.country}
//                     </td>
//                     <td className=" py-4 px-4 border-b">
//                       {availability ? "Available" : "Not Available"}
//                     </td>
//                     <td className=" py-4 px-4 border-b">
//                       {pet_allowed ? "Yes" : "No"}
//                     </td>
//                     <td className=" py-4 px-4 border-b">{max_occupancy}</td>
//                     <td className=" py-4 px-4 border-b flex flex-wrap gap-2">
//                       {images.map((imgSrc, index) => (
//                         <RoomImage
//                           key={index}
//                           imageSrc={localHost + imgSrc}
//                           onClick={handleImageClick}
//                         />
//                       ))}
//                     </td>
//                     <td className=" py-4 px-4 border-b">{room_type}</td>
//                     <td className=" py-4 px-4 border-b">
//                       {amenities.length > 0 ? (
//                         amenities.map((amenity, index) => (
//                           <div key={index}>
//                             <img
//                               className="w-10 h-10"
//                               src={localHost + amenity.image}
//                               alt={amenity.name}
//                             />
//                             <span>{amenity.name}</span>
//                           </div>
//                         ))
//                       ) : (
//                         <span>No amenities</span>
//                       )}
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <div className="flex justify-center gap-2">
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//                           aria-label={`Edit ${name}`}
//                           onClick={() => handleEdit(room)}
//                         >
//                           <FaEdit className="w-5 h-5" />
//                           <span className="hidden sm:inline">Edit</span>
//                         </button>
//                         <button
//                           className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
//                           aria-label={`Delete ${name}`}
//                           onClick={() => handleDelete(id, name)}
//                         >
//                           <FaTrashAlt className="w-5 h-5" />
//                           <span className="hidden sm:inline">Delete</span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </section>
//       {imageShow && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative bg-white p-4 rounded-lg">
//             <button
//               className="absolute top-2 right-2 text-black p-2 rounded-full hover:text-red-500"
//               onClick={handleCloseModal}
//               aria-label="Close"
//             >
//               <FaTimes className="w-6 h-6" />
//             </button>
//             <img
//               className="max-w-screen-sm max-h-screen"
//               src={selectedImage}
//               alt="Full-size view"
//             />
//           </div>
//         </div>
//       )}
//       {isGenericModalOpen && (
//         <GenericModal
//           isOpen={isGenericModalOpen}
//           onClose={() => setIsGenericModalOpen(false)}
//           onSubmit={handleSubmit}
//           isCreating={isCreating}
//           title={isCreating ? "Create New Banner" : "Edit Banner"}
//           fields={modalFields}
//         />
//       )}
//       {isConfirmModalOpen && (
//         <ConfirmationModal
//           message={`Are you sure you want to delete the Banner "${deleteName}"?`}
//           onConfirm={confirmDelete}
//           onCancel={cancelDelete}
//         />
//       )}
//       <ToastContainer />
//     </main>
//   );
// };

// export default AllRooms;

import React, { useEffect, useState } from "react";
import AllRoomsServices from "../../services/vendor/AllRoomsServices";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import { getAmenity } from "../../services/admin/Amenity";
import getCountry from "../../services/vendor/Country";
import getCity from "../../services/vendor/City";
import Catogary from "../../services/admin/Categary";
import BedTypes from "../../services/admin/BedTypes";
import RoomTypes from "../../services/admin/RoomTypes";

const RoomImagesGrid = ({ images, onClick }) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
      {images.map((img, index) =>
        img ? (
          <img
            key={index}
            src={img}
            alt={`room-thumbnail-${index}`}
            className="w-full h-auto object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onClick(img)}
          />
        ) : null
      )}
    </div>
  );
};

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [imageShow, setImageShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const localHost = "http://127.0.0.1:8000/";

  const fetchData = async () => {
    try {
      const [
        rooms,
        amenities,
        countries,
        cities,
        categories,
        bedTypes,
        roomTypes,
      ] = await Promise.all([
        AllRoomsServices.getRooms(),
        getAmenity(),
        getCountry(),
        getCity(),
        Catogary.getCategory(),
        BedTypes.getBedType(),
        RoomTypes.getRoomType(),
      ]);
      setRooms(rooms);
      setAmenities(amenities);
      setCountries(countries);
      setCities(cities);
      setCategories(categories);
      setBedTypes(bedTypes);
      setRoomTypes(roomTypes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("room is :", rooms);

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageClick = (image) => {
    setImageShow(true);
    setSelectedImage(image);
  };

  const handleDeleteClick = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setImageShow(false);
  };

  const confirmDelete = async () => {
    try {
      await AllRoomsServices.deleteRooms(deleteId);
      setRooms(rooms.filter((room) => room.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      toast.success(`Room "${deleteName}" deleted successfully!`);
    } catch (error) {
      setErrorMessage("Error deleting Room");
      toast.error("Error deleting Room");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
    setIsConfirmModalOpen(false);
  };

  const handleCreate = () => {
    setSelectedRoom(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (room) => {
    console.log('====================================');
    console.log('sentign data to updte',room);
    console.log('====================================');
    setSelectedRoom(room);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleSubmit = async (formData) => {
    try {
      console.log("Submitting form data:", formData); // Debug: Log the initial form data

      const formDataObj = new FormData();

      // Append text fields
      formDataObj.append("name", formData.name);
      formDataObj.append("category", formData.category);
      formDataObj.append("description", formData.description);
      formDataObj.append("price_per_night", formData.price_per_night);
      formDataObj.append("max_occupancy", formData.max_occupancy);

      // Append checkbox fields with correct boolean values
      console.log("Availability:", formData.availability); // Debug: Check the availability value
      formDataObj.append(
        "availability",
        formData.availability ? "true" : "false"
      );

      console.log("Pet Allowed:", formData.pet_allowed); // Debug: Check the pet_allowed value
      formDataObj.append(
        "pet_allowed",
        formData.pet_allowed ? "true" : "false"
      );

      // Append the amenities if available and properly formatted
      if (Array.isArray(formData.amenities)) {
        const amenitiesArray = formData.amenities.map((amenity) => amenity.pk);
        console.log("Amenities array:", amenitiesArray); // Debug: Check the amenities array
        formDataObj.append("amenities", JSON.stringify(amenitiesArray));
      } else {
        console.error(
          "Amenities is not an array or not properly formatted:",
          formData.amenities
        );
      }

      // Append the select fields
      formDataObj.append("bed_type", formData.bed_type);
      formDataObj.append("room_type", formData.room_type);

      // Handle file uploads
      // Debug: Log each image being appended

      formDataObj.append("image", formData.image);
      formDataObj.append("image2", formData.image2);
      formDataObj.append("image3", formData.image3);
      formDataObj.append("image4", formData.image4);
      formDataObj.append("image5", formData.image5);

      // Debug: Log the FormData key-value pairs
      console.log("FormData entries:");
      formDataObj.forEach((value, key) => {
        console.log(key, value);
      });

      // Decide whether to create or update
      const response = isCreating
        ? await AllRoomsServices.createRooms(formDataObj)
        : await AllRoomsServices.updateRooms(formData.id, formDataObj);

      console.log("Response from server:", response); // Debug: Log the server response

      setRooms((prevRooms) =>
        isCreating
          ? [...prevRooms, response]
          : prevRooms.map((r) => (r.id === response.id ? response : r))
      );
      setIsGenericModalOpen(false);
      toast.success(`Room ${isCreating ? "created" : "updated"} successfully!`);
    } catch (error) {
      console.error("Error saving Room:", error); // Debug: Log the error
      setErrorMessage("Error saving Room");
      toast.error("Error saving Room");
    }
  };

  const handleCloseGenericModal = () => {
    setIsGenericModalOpen(false);
  };

  const modalFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Room Name",
      label: "Room Name",
      required: true, // Required field
    },
    {
      name: "location",
      type: "location",
      placeholder: "Location",
      label: "Location",
    },
    {
      name: "category",
      type: "select",
      placeholder: "Select Category",
      label: "Category",
      options: categories, // Ensure categories are available
      required: true, // Required field
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Room Description",
      label: "Description",
    },
    {
      name: "price_per_night",
      type: "number",
      placeholder: "Price per Night",
      label: "Price per Night",
      required: true, // Required field
    },
    {
      name: "max_occupancy",
      type: "number",
      placeholder: "Max Occupancy",
      label: "Max Occupancy",
      required: true, // Required field
    },
    {
      name: "availability",
      type: "checkbox",
      label: "Available",
    },
    {
      name: "pet_allowed",
      type: "checkbox",
      label: "Pet Allowed",
    },
    {
      name: "room_type",
      type: "select",
      placeholder: "Select Room Type",
      label: "Room Type",
      options: roomTypes, // Ensure roomTypes are available
    },
    {
      name: "bed_type",
      type: "select",
      placeholder: "Select Bed Type",
      label: "Bed Type",
      options: bedTypes, // Ensure bedTypes are available
    },
    {
      name: "amenities",
      type: "checkbox-group",
      placeholder: "Select Amenities",
      label: "Amenities",
      options: amenities, // Ensure amenities are available
      multiple: true, // Allow multiple selections
    },
    {
      name: "image",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images",
      accept: "image/*", // Restrict to image files
      required: true,
    },
    {
     name: "image2", type: "file", label: "Image2", accept: "image/*",required: true,
      
    },
    {
      name: "image3",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images3",
      accept: "image/*", // Restrict to image files
      required: true,
    },
    {
      name: "image4",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images4",
      accept: "image/*", // Restrict to image files
      required: true,
    },
    {
      name: "image5",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images5",
      accept: "image/*", // Restrict to image files
      required: true,
    },
    {
      name: "google_map_url",
      type: "text",
      placeholder: "Google Map URL",
      label: "Google Map URL",
    },
  ];

  return (
    <main className="pl-1 pt-2 mx-auto max-w-6xl">
      <ToastContainer />
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Rooms (<span>{rooms.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
      </header>
      <section className="overflow-x-auto mt-4">
        <div className="overflow-y-auto h-[calc(100vh-110px)]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
                <th className="py-2 px-4 text-left truncate">ID</th>
                <th className="py-2 px-4 text-left truncate">Images</th>
                <th className="py-2 px-4 text-left truncate">Name</th>
                <th className="py-2 px-4 text-left truncate">Category</th>
                <th className="py-2 px-4 text-left truncate">Category Image</th>
                <th className="py-2 px-4 text-left truncate">Description</th>
                <th className="py-2 px-4 text-left truncate">
                  Price per Night
                </th>
                <th className="py-2 px-4 text-left truncate">Max Occupancy</th>
                <th className="py-2 px-4 text-left truncate">Availability</th>
                <th className="py-2 px-4 text-left truncate">Room Type</th>
                <th className="py-2 px-4 text-left truncate">Bed Type</th>
                <th className="py-2 px-4 text-left truncate">Created At</th>
                <th className="py-2 px-4 text-left truncate">Amenities</th>
                <th className="py-2 px-4 text-left truncate">
                  Amenities Image
                </th>
                {/* New column for Actions */}
                <th className="py-2 px-4 text-left truncate">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="14" className="py-4 text-center">
                    No rooms found
                  </td>
                </tr>
              ) : (
                rooms.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="py-2 px-4">{r.id}</td>
                    <td className="py-2 px-4">
                      <RoomImagesGrid
                        images={[
                          `${localHost}${r.image}`,
                          `${localHost}${r.image2}`,
                          `${localHost}${r.image3}`,
                          `${localHost}${r.image4}`,
                          `${localHost}${r.image5}`,
                        ]}
                        onClick={handleImageClick}
                      />
                    </td>
                    <td className="py-2 px-4">{r.name}</td>
                    <td className="py-2 px-4">{r.category.name}</td>
                    <td className="py-2 px-4">
                      <img
                        src={`${localHost}${r.category.image}`}
                        alt="category"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-2 px-4">{r.description}</td>
                    <td className="py-2 px-4">{r.price_per_night}</td>
                    <td className="py-2 px-4">{r.max_occupancy}</td>
                    <td
                      className={`py-2 px-4 ${
                        r.availability ? "text-green-500" : "text-red-700"
                      }`}
                    >
                      {r.availability ? "Available" : "Not Available"}
                    </td>
                    <td className="py-2 px-4">{r.room_type}</td>
                    <td className="py-2 px-4">{r.bed_type}</td>
                    <td className="py-2 px-4">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="py-2 px-4">
                      {/* Display amenities */}
                      {r.amenities && r.amenities.length > 0 ? (
                        r.amenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex items-center mb-1"
                          >
                            <span className="mr-2">{amenity.name}</span>
                          </div>
                        ))
                      ) : (
                        <div>No amenities</div>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {r.amenities && r.amenities.length > 0 ? (
                        r.amenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex items-center mb-1"
                          >
                            {amenity.image && (
                              <img
                                src={localHost + amenity.image}
                                alt={amenity.name}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <div>No images</div>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEdit(r)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(r.id, r.name)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={() => setIsGenericModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedRoom || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Category" : "Edit Category"}
          fields={modalFields}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message={`Are you sure you want to delete the room "${deleteName}"?`}
        />
      )}

      {imageShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img
            src={selectedImage}
            alt="selected"
            className="max-w-screen-sm max-h-screen"
          />
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>
        </div>
      )}
    </main>
  );
};

export default AllRooms;
