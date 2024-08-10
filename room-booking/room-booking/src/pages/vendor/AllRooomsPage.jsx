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
//   const [selectedData, setSelectedData] = useState(false);
//   const [amenitiesState, setAmenities] = useState([]);
//   const [country, setCountries] = useState([]);
//   const [city, setCities] = useState([]);
//   console.log("selected dat ", selectedData);
//   console.log(
//     "selected dat ",
//     selectedData.location ? selectedData.location.name : "bo"
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
//     setSelectedData(null);
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
//     setSelectedData(room);
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
//       value: selectedData?.name || "",
//     },
//     {
//       name: "description",
//       type: "textarea",
//       label: "Description",
//       placeholder: "Enter Room Description",
//       value: selectedData?.description || "",
//     },
//     {
//       name: "price_per_night",
//       type: "number",
//       label: "Price per Night",
//       placeholder: "Enter Price per Night",
//       value: selectedData?.price_per_night || "",
//     },
//     {
//       name: "availability",
//       type: "checkbox",
//       label: "Availability",
//       value: selectedData?.availability || false,
//     },
//     // {
//     //   name: "bed_type",
//     //   type: "text",
//     //   label: "Bed Type",
//     //   placeholder: "Enter Bed Type",
//     //   value: selectedData?.bed_type || "",
//     // },
//     // {
//     //   name: "room_type",
//     //   type: "text",
//     //   label: "Room Type",
//     //   placeholder: "Enter Room Type",
//     //   value: selectedData?.room_type || "",
//     // },
//     {
//       name: "max_occupancy",
//       type: "number",
//       label: "Max Occupancy",
//       placeholder: "Enter Maximum Occupancy",
//       value: selectedData?.max_occupancy || "",
//     },
//     {
//       name: "pet_allowed",
//       type: "checkbox",
//       label: "Pet Allowed",
//       value: selectedData?.pet_allowed || false,
//     },
//     // {
//     //   name: "Room",
//     //   type: "text",
//     //   label: "Room",
//     //   placeholder: "Enter Room",
//     //   value: selectedData?.Room.name || "",
//     // },
//     {
//       name: "google_map_url",
//       type: "url",
//       label: "Google Map URL",
//       placeholder: "Enter Google Map URL",
//       value: selectedData?.google_map_url || "",
//     },
//     // {
//     //   name: "location",
//     //   type: "text",
//     //   label: "Location",
//     //   placeholder: "Enter Location (City, Country)",
//     //   value: selectedData.location ? selectedData.location.name : "",
//     // },
//     // {
//     //   name: "city",
//     //   type: "text",
//     //   label: "City",
//     //   placeholder: "Enter Location (City)",
//     //   value: selectedData.location ? selectedData.location.city : "",
//     // },
//     {
//       name: "created_at",
//       type: "text",
//       label: "Created At",
//       placeholder: "Creation Date",
//       value: selectedData?.created_at || "",
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
//     //       checked: selectedData?.amenities?.includes(amenity.id) || false,
//     //     })) || [],
//     // },
//     // {
//     //   name: "image",
//     //   type: "file",
//     //   label: "Room Image",
//     //   placeholder: "Upload Room Image",
//     //   value: selectedData?.image || "",
//     // },
//     // {
//     //   name: "image2",
//     //   type: "file",
//     //   label: "Additional Image 1",
//     //   placeholder: "Upload Additional Image 1",
//     //   value: selectedData?.image2 || "",
//     // },
//     // {
//     //   name: "image3",
//     //   type: "file",
//     //   label: "Additional Image 2",
//     //   placeholder: "Upload Additional Image 2",
//     //   value: selectedData?.image3 || "",
//     // },
//     // {
//     //   name: "image4",
//     //   type: "file",
//     //   label: "Additional Image 3",
//     //   placeholder: "Upload Additional Image 3",
//     //   value: selectedData?.image4 || "",
//     // },
//     // {
//     //   name: "image5",
//     //   type: "file",
//     //   label: "Additional Image 4",
//     //   placeholder: "Upload Additional Image 4",
//     //   value: selectedData?.image5 || "",
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
//           initialData={selectedData || {}}
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
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import ConfirmationModal from "../../components/common/admin/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewButton from "../../components/common/admin/AddNewButton";
import GenericModal from "../../components/common/admin/GenericModal";
import { getAmenity } from "../../services/admin/Amenity";
import getCountry from "../../services/vendor/Country";
import getCity from "../../services/vendor/City";
import Catogary from "../../services/admin/Catogary";
import BedTypes from "../../services/admin/BedTypes";
import RoomTypes from "../../services/admin/RoomTypes";
const RoomImage = ({ imageSrc, onClick }) => (
  <img
    src={imageSrc}
    alt="room"
    className="w-10 h-10 object-cover rounded-lg"
    onClick={() => onClick(imageSrc)}
  />
);

// All Rooms 12
const AllRooms = () => {
  const [room, setRoom] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [bedType, setBedTypes] = useState([]);
  const [roomType, setRoomTypes] = useState([]);

  const [imageShow, setImageShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [deleteName, setDeleteName] = useState("");
  const localHost ="http://127.0.0.1:8000/";

  console.log("====================================");
  console.log("checking data is catogaries is :", categories);
  console.log("checking data is countries is :", countries);
  console.log("checking data is amenities is :", amenities);
  console.log("checking data is cities is :", cities);
  console.log("checking data is bedtypes is :", bedType);
  console.log("checking data is Roomtypes is :", roomType);
  console.log("====================================");

  const fetchRooms = async () => {
    try {
      const data = await AllRoomsServices.getRooms();
      console.log("Room details:", data);
      setRoom(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };
  const fetchRoomTypes = async () => {
    try {
      const data = await RoomTypes.getRoomType();

      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const handleImageClick = (image) => {
    setImageShow(true);
    setSelectedImage(image);
  };

  const fetchAmenities = async () => {
    try {
      const data = await getAmenity();
      setAmenities(data);
    } catch (error) {
      console.log("Error fetching amenities:", error);
    }
  };
  const fetchCountry = async () => {
    try {
      const data = await getCountry();
      console.log(" All country is ", data);

      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const fetchCity = async () => {
    try {
      const data = await getCity();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  const fetchCategory = async () => {
    try {
      const data = await Catogary.getCategory();

      setCategories(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  const fetchBedTypes = async () => {
    try {
      const data = await BedTypes.getBedType();

      setBedTypes(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchAmenities();
    fetchCountry();
    fetchCity();
    fetchCategory();
    fetchBedTypes();
    fetchRoomTypes();
  }, []);

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
      setRoom(room.filter((room) => room.id !== deleteId));
      setIsConfirmModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      setErrorMessage("");
      toast.success(`Room "${deleteName}" deleted successfully!`);
    } catch (error) {
      console.log("Error deleting Room:", error);
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
    setSelectedRooms(null);
    setIsCreating(true);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleEdit = (Room) => {
    setSelectedRooms(Room);
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
      // Add other fields similarly
      try {
        const data = await AllRoomsServices.createRooms(formDataToSend, true);
        setRoom((prev) => [...prev, data]);
        toast.success(`Room ${data.name} created successfully!`);
      } catch (error) {
        setErrorMessage("Error occurred while creating Room");
        toast.error("Error occurred while creating Room");
      }
    } else {
      if (formData.name && formData.name !== selectedRooms.name) {
        formDataToSend.append("name", formData.name);
      }
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }
      // Add other fields similarly
      try {
        const updatedData = await AllRoomsServices.updateRooms(
          selectedRooms.id,
          formDataToSend,
          true
        );
        setRoom(
          room.map((room) =>
            room.id === selectedRooms.id ? updatedData : room
          )
        );
        toast.success(`Room ${updatedData.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating Room:", error);
        setErrorMessage("Error occurred while saving Room");
        toast.error("Error occurred while saving Room");
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
      placeholder: "Enter Room name",
    },
    { name: "image", type: "file", label: "Image", accept: "image/*" },
    { name: "description", type: "textarea", label: "Description" },
    { name: "price_per_night", type: "number", label: "Price Per Night" },


    
    {
      name: "bed_type",
      type: "select",
      label: "Bed Type",
      options: bedType.map((bedtype) => ({
        label: bedtype.name,
        value: bedtype.id,
      })),
      required: true,
    },

    {
      name: "room_type",
      type: "select",
      label: "Room Type",
      options: roomType.map((roomType) => ({
        label: roomType.name,
        value: roomType.id,
      })),
      required: true,
    },

    { name: "max_occupancy", type: "number", label: "Max Occupancy" },
    { name: "availability", type: "checkbox", label: "Availability" },
    { name: "pet_allowed", type: "checkbox", label: "Pet Allowed" },
    { name: "google_map_url", type: "text", label: "Google Map URL" },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: categories.map((cat) => ({ label: cat.name, value: cat.id })),
      required: true,
    },
    {
      name: "location",
      type: "select",
      label: "Location",
      options: countries.map((country) => ({
        label: country.name,
        value: country.id,
      })),
      required: true,
    },
    {
      name: "city",
      type: "select",
      label: "City",
      options: cities.map((city) => ({ label: city.name, value: city.id })),
      required: true,
    },
    {
      name: "amenities",
      type: "checkbox-group",
      label: "Amenities",
      options: amenities.map((amenity) => ({
        label: amenity.name,
        value: amenity.id,
      })),
    },
  ];

  return (
    <main className="pl-1 pt-2 mx-auto max-w-6xl">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h1 className="text-3xl font-bold">
          All Rooms (<span>{room.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
      </header>
      <section className="overflow-x-auto mt-4">
        <div className="overflow-y-auto h-[calc(100vh-110px)]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
                <th className=" py-4 px-4 border-b">#</th>
                <th className=" py-4 px-4 border-b">Name</th>
                <th className=" py-4 px-4 border-b">Description</th>
                <th className=" py-4 px-4 border-b truncate">
                  Price Per Night
                </th>
                <th className=" py-4 px-4 border-b">Room</th>
                <th className=" py-4 px-4 border-b">Location</th>
                <th className=" py-4 px-4 border-b">Availability</th>
                <th className=" py-4 px-4 border-b truncate">Pet Allowed</th>
                <th className=" py-4 px-4 border-b truncate">Max Occupancy</th>
                <th className=" py-4 px-4 border-b">Images</th>
                <th className=" py-4 px-4 border-b">RoomType</th>
                <th className=" py-4 px-4 border-b">Amenities</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {room.map((room, idx) => {
                const {
                  id,
                  name,
                  description,
                  price_per_night,
                  Room,
                  location,
                  availability,
                  pet_allowed,
                  max_occupancy,
                  room_type,
                  amenities,
                } = room;
                const images = [
                  room.image,
                  room.image2,
                  room.image3,
                  room.image4,
                  room.image5,
                ].filter(Boolean);
                return (
                  <tr
                    key={id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200`}
                  >
                    <td className=" py-4 px-4 border-b">{idx + 1}</td>
                    <td className=" py-4 px-4 border-b">{name}</td>
                    <td className=" py-4 px-4 border-b">{description}</td>
                    <td className=" py-4 px-4 border-b">{price_per_night}</td>
                    <td className=" py-4 px-4 border-b">{name}</td>
                    <td className=" py-4 px-4 border-b">
                      {location.name}, {location.city}, {location.country}
                    </td>
                    <td className=" py-4 px-4 border-b">
                      {availability ? "Available" : "Not Available"}
                    </td>
                    <td className=" py-4 px-4 border-b">
                      {pet_allowed ? "Yes" : "No"}
                    </td>
                    <td className=" py-4 px-4 border-b">{max_occupancy}</td>
                    <td className=" py-4 px-4 border-b flex flex-wrap gap-2">
                      {images.map((imgSrc, index) => (
                        <RoomImage
                          key={index}
                          imageSrc={localHost + imgSrc}
                          onClick={handleImageClick}
                        />
                      ))}
                    </td>
                    <td className=" py-4 px-4 border-b">{room_type}</td>
                    <td className=" py-4 px-4 border-b">
                      {amenities.length > 0 ? (
                        amenities.map((amenity, index) => (
                          <div key={index}>
                            <img
                              className="w-10 h-10"
                              src={localHost + amenity.image}
                              alt={amenity.name}
                            />
                            <span>{amenity.name}</span>
                          </div>
                        ))
                      ) : (
                        <span>No amenities</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                          aria-label={`Edit ${name}`}
                          onClick={() => handleEdit(room)}
                        >
                          <FaEdit className="w-5 h-5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                          aria-label={`Delete ${name}`}
                          onClick={() => handleDelete(id, name)}
                        >
                          <FaTrashAlt className="w-5 h-5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {imageShow && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-black p-2 rounded-full hover:text-red-500"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img
              className="max-w-screen-sm max-h-screen"
              src={selectedImage}
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
          initialData={selectedRooms || {}}
          isCreating={isCreating}
          title={isCreating ? "Create New Room" : "Edit Room"}
          fields={modalFields}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete the Room "${deleteName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer />
    </main>
  );
};

export default AllRooms;
