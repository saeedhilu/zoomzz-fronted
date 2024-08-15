import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const RoomTable = ({
  rooms,
  handleEdit,
  handleDelete,
  handleImageClick,
  localHost,
  handleAddNew,
}) => {
  console.log("====================================");
  console.log("rooom", rooms);
  console.log("====================================");
  return (
    <main className="pl-1 pt-2 mx-auto max-w-6xl">
      <header className="border-b-2 border-gray-400 pb-2 flex justify-between">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
          onClick={handleAddNew}
        >
          <span className="text-sm">Add New Room</span>
        </button>
      </header>

      <div className="overflow-x-auto">
        <div className="overflow-y-auto h-[calc(100vh-110px)] overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
                <th className="py-4 px-2 md:px-4 border-b">#</th>
                <th className="py-4 px-2 md:px-4 border-b">Name</th>
                <th className="py-4 px-2 md:px-4 border-b truncate">
                  Description
                </th>
                <th className="py-4 px-2 md:px-4 border-b truncate">
                  Price Per Night
                </th>
                <th className="py-4 px-2 md:px-4 border-b">Location</th>
                <th className="py-4 px-2 md:px-4 border-b">Availability</th>
                <th className="py-4 px-2 md:px-4 border-b truncate">
                  Pet Allowed
                </th>
                <th className="py-4 px-2 md:px-4 border-b truncate">
                  Max Occupancy
                </th>
                <th className="py-4 px-2 md:px-4 border-b">Images</th>
                <th className="py-4 px-2 md:px-4 border-b">Room Type</th>
                <th className="py-4 px-2 md:px-4 border-b">Amenities</th>
                <th className="py-3 px-2 md:px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, idx) => {
                const {
                  id,
                  name,
                  description,
                  price_per_night,
                  location,
                  availability,
                  pet_allowed,
                  max_occupancy,
                  room_type,
                  amenities,
                  image,
                  image2,
                  image3,
                  image4,
                  image5,
                } = room;

                const images = [image, image2, image3, image4, image5]
                  .filter(Boolean)
                  .map((img) =>
                    img.startsWith("http") ? img : localHost + img
                  );

                return (
                  <tr
                    key={id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200`}
                  >
                    <td className="py-4 px-2 md:px-4 border-b">{idx + 1}</td>
                    <td className="py-4 px-2 md:px-4 border-b">{name}</td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {description}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {price_per_night}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {location.name}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {availability ? "Available" : "Not Available"}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {pet_allowed ? "Yes" : "No"}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {max_occupancy}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b">
                      <div className="flex space-x-2">
                        {images.length > 0 ? (
                          images.map((image, index) => (
                            <div
                              key={index}
                              className="w-16 h-16 bg-cover bg-center rounded-lg cursor-pointer"
                              style={{ backgroundImage: `url(${image})` }}
                              onClick={() => handleImageClick(image)}
                            />
                          ))
                        ) : (
                          <span>No Images</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b">
                      {room_type.name}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b truncate">
                      {amenities ? amenities.join(", ") : "N/A"}
                    </td>
                    <td className="py-4 px-2 md:px-4 border-b">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(room)}
                        aria-label={`Edit ${name}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => handleDelete(id, name)}
                        aria-label={`Delete ${name}`}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default RoomTable;
