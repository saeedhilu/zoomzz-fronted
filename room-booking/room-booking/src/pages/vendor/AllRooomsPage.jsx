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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 w-40">
      {images.map((img, index) =>
        img ? (
          <img
            key={index}
            src={img}
            alt={`room-thumbnail-${index}`}
            className="w-28 h-10 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
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

console.log('room from statte',rooms);

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
  console.log('====================================');
  console.log('rooms is :',rooms);
  console.log('====================================');





  rooms.map((m) => {
    console.log('For devyggubgs',m.name);
    return null; 
  });
  

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
    console.log("====================================");
    console.log("sentign data to updte", room);
    console.log("====================================");
    setSelectedRoom(room);
    setIsCreating(false);
    setIsGenericModalOpen(true);
    setErrorMessage("");
  };

  const handleSubmit = async (formData) => {
    try {
      console.log("Submitting form data:", formData);

      const formDataObj = new FormData();
      if(isCreating){
         formDataObj.append("name", formData.name);

      formDataObj.append("category", formData.category);
      formDataObj.append("description", formData.description);
      formDataObj.append("price_per_night", formData.price_per_night);
      formDataObj.append("max_occupancy", formData.max_occupancy);
      formDataObj.append("location.name", formData.location_name);
      formDataObj.append("location.city", formData.city);
      formDataObj.append("location.country", formData.country);

      formDataObj.append(
        "availability",
        formData.availability === "yes" ? "true" : "false"
      );

      console.log('====================================');
      console.log('for checking yes or no ',formData.pet_allowed,formData.availability);
      console.log('====================================');
      formDataObj.append(
        "pet_allowed",
        formData.pet_allowed=== "yes" ? "true" : "false"
      );

      formDataObj.append("bed_type", formData.bed_type);
      formDataObj.append("room_type", formData.room_type);



      formDataObj.append("image", formData.image);
      formDataObj.append("image2", formData.image2);
      formDataObj.append("image3", formData.image3);
      formDataObj.append("image4", formData.image4);
      formDataObj.append("image5", formData.image5);
      if (formData.amenities.length > 1) {
        for (let i = 1; i < formData.amenities.length; i++) {
          console.log("====================================");
          console.log("form data amenity :", formData.amenities[i]);
          console.log("====================================");
          console.log(
            "====================================",
            formData.amenities.length
          );
          formDataObj.append("amenities", formData.amenities[i]);
        }
      } else {
        console.log("issie");
        formDataObj.append("amenities", formData.amenities);
      }
      
      }else {





        console.log('====================================');
        console.log('selected data is :',selectedRoom);
        console.log('fromdtata:',formData);
        console.log('fromdtata location :',formData.location.country,selectedRoom?.location?.name);
        console.log('====================================');
        if (formData.name !== selectedRoom?.name) {
            formDataObj.append("name", formData.name);
        }
        if (formData.category !== selectedRoom?.category) {
            formDataObj.append("category", formData.category);
        }
        if (formData.description !== selectedRoom?.description) {
            formDataObj.append("description", formData.description);
        }
        if (formData.price_per_night !== selectedRoom?.price_per_night) {
            formDataObj.append("price_per_night", formData.price_per_night);
        }
        if (formData.max_occupancy !== selectedRoom?.max_occupancy) {
            formDataObj.append("max_occupancy", formData.max_occupancy);
        }
        if (formData.location.name !== selectedRoom?.location?.name) {
            formDataObj.append("location.name", formData.location_name);
        }
        if (formData.location.city !== selectedRoom?.location?.city) {
          console.log('====================================');
          console.log('city is open');
          console.log('====================================');
            formDataObj.append("location.city", formData.city);
        }
        if (formData.location.country !== selectedRoom?.location?.country) {
          
          console.log('====================================' , formData.country,selectedRoom.location.country);
          console.log('country is open');
          console.log('====================================');
            formDataObj.append("location.country", formData.country);
        }
        if (formData.availability !== selectedRoom?.availability) {
            formDataObj.append("availability", formData.availability ? "true" : "false");
        }
        if (formData.pet_allowed !== selectedRoom?.pet_allowed) {
            formDataObj.append("pet_allowed", formData.pet_allowed ? "true" : "false");
        }
        if (formData.bed_type !== selectedRoom?.bed_type) {
            formDataObj.append("bed_type", formData.bed_type);
        }
        if (formData.room_type !== selectedRoom?.room_type) {
            formDataObj.append("room_type", formData.room_type);
        }
        if (formData.image instanceof File) {
            formDataObj.append("image", formData.image);
        }
        if (formData.image2 instanceof File) {
            formDataObj.append("image2", formData.image2);
        }
        if (formData.image3 instanceof File) {
            formDataObj.append("image3", formData.image3);
        }
        if (formData.image4 instanceof File) {
            formDataObj.append("image4", formData.image4);
        }
        if (formData.image5 instanceof File) {
            formDataObj.append("image5", formData.image5);
        }
        if (formData.amenities.length !== selectedRoom?.amenities?.length) {
            for (let i = 0; i < formData.amenities.length; i++) {
                formDataObj.append("amenities", formData.amenities[i]);
            }
        }
    }
      
      console.log("FormData entries:");
      formDataObj.forEach((value, key) => {
        console.log(key, value);
      });

      const response = isCreating
        ? await AllRoomsServices.createRooms(formDataObj)
        : await AllRoomsServices.updateRooms(formData.id, formDataObj);

      console.log("Response from server:", response); 

      setRooms((prevRooms) =>
        isCreating
          ? [...prevRooms, response]
          : prevRooms.map((r) => (r.id === response.id ? response : r))
      );
      setIsGenericModalOpen(false);
      toast.success(`Room ${isCreating ? "created" : "updated"} successfully!`);
    } catch (error) {
      console.error("Error saving Room:", error); 
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
 // Required field
    },
    {
      name: "location_name",
      type: "text",
      placeholder: "Enter Location",
      label: "Location",
    },
    {
      name: "country",
      type: "select",
      placeholder: "Select Country",
      label: "Country",
      options: countries,

    },
    {
      name: "city",
      type: "select",
      placeholder: "Enter City",
      label: "City",
      options: cities,

    },
    {
      name: "category",
      type: "select",
      placeholder: "Select Category",
      label: "Category",
      options: categories,
 // Required field
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
 // Required field
    },
    {
      name: "max_occupancy",
      type: "number",
      placeholder: "Max Occupancy",
      label: "Max Occupancy",
 // Required field
    },
    {
      name: "availability",
      type: "radio-group",
      label: "Available",
      options: {
        yes: 'Yes',
        no: 'No',
      },
    },
    {
      name: 'pet_allowed',
      type: 'radio-group',
      label: 'Pet Allowed',
      options: {
        yes: 'Yes',
        no: 'No',
      },
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

    },
    {
      name: "image2",
      type: "file",
      label: "Image2",
      accept: "image/*",

    },
    {
      name: "image3",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images3",
      accept: "image/*", // Restrict to image files

    },
    {
      name: "image4",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images4",
      accept: "image/*", // Restrict to image files

    },
    {
      name: "image5",
      type: "file",
      placeholder: "Upload Room Images",
      label: "Images5",
      accept: "image/*", // Restrict to image files

    },
    {
      name: "google_map_url",
      type: "text",
      placeholder: "Google Map URL",
      label: "Google Map URL",
    },
  ];

  return (
      <main className="  ">
      {/* <div>
        
      </div> */}
      <ToastContainer />
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between   ">
        <h1 className="text-3xl font-bold">
          All Rooms (<span>{rooms.length}</span>)
        </h1>
        <AddNewButton onClick={handleCreate} label="Add New +" />
      </header>
      <section className="  mt-4">
        <div className="overflow-y-auto h-[calc(100vh-110px)]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-x-auto">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
                <th className="py-2 px-4 text-left truncate">ID</th>
                <th className="py-2 px-4 text-left truncate">Images</th>
                <th className="py-2 px-4 text-left truncate">Name</th>
                <th className="py-2 px-4 text-left truncate">Category</th>
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
                    <td className="py-2 px-4 underline text-blue-500 cursor-pointer"  onClick={() => handleEdit(r)}>{r.id}</td>
                    <td className="py-2 px-4 ">
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
                    <td className="py-2 px-4 truncate">{r.name}</td>
                    <td className="py-2 px-4">{r.category && r.category.length > 0 ? (
                        
                        r.category.map((category) => (
                          
                          <div
                          
                            key={category.id}
                            className="flex items-center mb-1 truncate"
                          >
                            <span>{category.name}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-red-600 ">No category</p>
                      )}</td>
                    <td className="py-2 px-4">{r.description}</td>
                    <td className="py-2 px-4">{r.price_per_night}</td>
                    <td className="py-2 px-4 ">{r.max_occupancy}</td>
                    <td
                      className={`truncate py-2 px-4 ${
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
                      {console.log('amenitites are ::::::',r.amenities)}
                      {r.amenities && r.amenities.length > 0 ? (
                        
                        r.amenities.map((amenity) => (
                          
                          <div
                          
                            key={amenity.id}
                            className="flex items-center mb-1 truncate"
                          >
                            <span>{amenity.name}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-red-600 ">No amenities</p>
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
            className="max-w-screen-sm max-h-screen h-screen "
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
