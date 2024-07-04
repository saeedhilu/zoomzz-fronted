// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import searchRooms from "../../../services/searchServices";
// import getCategories from "../../../services/Categories";
// import getAmenities from "../../../services/Amenity";
// import getRoomTypes from "../../../services/RoomType";
// import getBedTypes from "../../../services/BedType";

// const RoomFilter = () => {
//   const [filters, setFilters] = useState({
//     location: "",
//     min_price: "",
//     max_price: "",
//     category: "",
//     roomtype: "",
//     pricepernight: "",
//     checkin: "",
//     checkout: "",
//     guestcount: "",
//     ordering: "",
//   });

//   const [filterOptions, setFilterOptions] = useState({
//     categories: [],
//     amenities: [],
//     roomTypes: [],
//     bedTypes: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFilterOptions = async () => {
//       setLoading(true);
//       try {
//         const [
//           categoriesResponse,
//           amenitiesResponse,
//           roomTypesResponse,
//           bedTypesResponse,
//         ] = await Promise.all([
//           getCategories(),
//           getAmenities(),
//           getRoomTypes(),
//           getBedTypes(),
//         ]);

//         setFilterOptions({
//           categories: categoriesResponse,
//           amenities: amenitiesResponse,
//           roomTypes: roomTypesResponse,
//           bedTypes: bedTypesResponse,
//         });
//       } catch (error) {
//         console.error("Error fetching filter options:", error);
//         setError("Failed to fetch filter options");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilterOptions();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const applyFilters = async () => {
//     setLoading(true);
//     try {
//       const data = await searchRooms(filters);
//       navigate("/room-list", { state: { rooms: data } });
//     } catch (error) {
//       console.error("Error filtering rooms:", error);
//       setError("Failed to filter rooms");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border border-gray-300 rounded mb-4">
//       <h2 className="text-lg font-bold mb-4">Room Filters</h2>
//       {error && <p className="text-red-500 mb-4">Error: {error}</p>}
//       <div className="mb-2">
//         <label htmlFor="location" className="mr-2">Location:</label>
//         <input
//           type="text"
//           name="location"
//           id="location"
//           value={filters.location}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="min_price" className="mr-2">Min Price:</label>
//         <input
//           type="number"
//           name="min_price"
//           id="min_price"
//           value={filters.min_price}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="max_price" className="mr-2">Max Price:</label>
//         <input
//           type="number"
//           name="max_price"
//           id="max_price"
//           value={filters.max_price}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="category" className="mr-2">Category:</label>
//         <select
//           name="category"
//           id="category"
//           value={filters.category}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         >
//           <option value="">Select category</option>
//           {filterOptions.categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mb-2">
//         <label htmlFor="roomtype" className="mr-2">Room Type:</label>
//         <select
//           name="roomtype"
//           id="roomtype"
//           value={filters.roomtype}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         >
//           <option value="">Select room type</option>
//           {filterOptions.roomTypes.map((roomType) => (
//             <option key={roomType.id} value={roomType.id}>
//               {roomType.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mb-2">
//         <label htmlFor="pricepernight" className="mr-2">Price per Night:</label>
//         <input
//           type="number"
//           name="pricepernight"
//           id="pricepernight"
//           value={filters.pricepernight}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="checkin" className="mr-2">Check-in:</label>
//         <input
//           type="date"
//           name="checkin"
//           id="checkin"
//           value={filters.checkin}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="checkout" className="mr-2">Check-out:</label>
//         <input
//           type="date"
//           name="checkout"
//           id="checkout"
//           value={filters.checkout}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="guestcount" className="mr-2">Guest Count:</label>
//         <input
//           type="number"
//           name="guestcount"
//           id="guestcount"
//           value={filters.guestcount}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="ordering" className="mr-2">Ordering:</label>
//         <input
//           type="text"
//           name="ordering"
//           id="ordering"
//           value={filters.ordering}
//           onChange={handleFilterChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>

//       <button
//         onClick={applyFilters}
//         disabled={loading}
//         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2"
//       >
//         {loading ? "Applying Filters..." : "Apply Filters"}
//       </button>
//       {loading && <p className="mt-2">Loading...</p>}
//     </div>
//   );
// };

// export default RoomFilter;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchRooms from "../../../services/searchServices";
import getCategories from "../../../services/Categories";
import getAmenities from "../../../services/Amenity";
import getRoomTypes from "../../../services/RoomType";
import getBedTypes from "../../../services/BedType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const RoomFilter = () => {
  const [filters, setFilters] = useState({
    min_price: "",
    max_price: "",
    category: [],
    amenities: [],
    roomtype: [],
    bedtype: [],
    ordering: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    amenities: [],
    roomTypes: [],
    bedTypes: [],
  });

  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const [
          categoriesResponse,
          amenitiesResponse,
          roomTypesResponse,
          bedTypesResponse,
        ] = await Promise.all([
          getCategories(),
          getAmenities(),
          getRoomTypes(),
          getBedTypes(),
        ]);

        setFilterOptions({
          categories: categoriesResponse,
          amenities: amenitiesResponse,
          roomTypes: roomTypesResponse,
          bedTypes: bedTypesResponse,
        });
      } catch (error) {
        console.error("Error fetching filter options:", error);
        setError("Failed to fetch filter options");
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: [...prevFilters[name], value],
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: prevFilters[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const data = await searchRooms(filters);
      navigate("/room-list", { state: { rooms: data } });
    } catch (error) {
      console.error("Error filtering rooms:", error);
      setError("Failed to filter rooms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2 mb-4"
      >
        <FontAwesomeIcon icon={faFilter} />
        <span className="ml-2">{showFilter ? "Hide Filters" : "Show Filters"}</span>
      </button>
      <div
        className={`fixed top-0 left-0 w-72 bg-white p-4 border border-gray-300 rounded h-full transform transition-transform overflow-y-auto ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setShowFilter(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-lg font-bold mb-4">Room Filters</h2>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <div className="mb-2">
          <label htmlFor="min_price" className="mr-2">
            Min Price:
          </label>
          <input
            type="number"
            name="min_price"
            id="min_price"
            value={filters.min_price}
            onChange={handleFilterChange}
            className="px-2 py-1 border  border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="max_price" className="mr-2">
            Max Price:
          </label>
          <input
            type="number"
            name="max_price"
            id="max_price"
            value={filters.max_price}
            onChange={handleFilterChange}
            className="px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="mr-2">Category:</label>
          <div className="flex flex-wrap">
            {filterOptions.categories.map((category) => (
              <div key={category.id} className="w-1/2 mb-2">
                <input
                  type="checkbox"
                  name="category"
                  id={`category_${category.id}`}
                  value={category.id.toString()}
                  checked={filters.category.includes(category.id.toString())}
                  onChange={handleFilterChange}
                  className="mr-2 checked:bg-gray-500"
                />
                <label htmlFor={`category_${category.id}`}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label className="mr-2">Amenities:</label>
          <div className="flex flex-wrap">
            {filterOptions.amenities.map((amenity) => (
              <div key={amenity.id} className="w-1/2 mb-2">
                <input
                  type="checkbox"
                  name="amenities"
                  id={`amenity_${amenity.id}`}
                  value={amenity.id.toString()}
                  checked={filters.amenities.includes(amenity.id.toString())}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor={`amenity_${amenity.id}`}>{amenity.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label className="mr-2">Room Type:</label>
          <div className="flex flex-wrap">
            {filterOptions.roomTypes.map((roomType) => (
              <div key={roomType.id} className="w-1/2 mb-2">
                <input
                  type="checkbox"
                  name="roomtype"
                  id={`roomtype_${roomType.id}`}
                  value={roomType.id.toString()}
                  checked={filters.roomtype.includes(roomType.id.toString())}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor={`roomtype_${roomType.id}`}>{roomType.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label className="mr-2">Bed Type:</label>
          <div className="flex flex-wrap">
            {filterOptions.bedTypes.map((bedType) => (
              <div key={bedType.id} className="w-1/2 mb-2">
                <input
                  type="checkbox"
                  name="bedtype"
                  id={`bedtype_${bedType.id}`}
                  value={bedType.id.toString()}
                  checked={filters.bedtype.includes(bedType.id.toString())}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor={`bedtype_${bedType.id}`}>{bedType.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="ordering" className="mr-2">
            Ordering:
          </label>
          <select
            name="ordering"
            id="ordering"
            value={filters.ordering}
            onChange={handleFilterChange}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="">Select ordering</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>

        <button
          onClick={applyFilters}
          disabled={loading}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2"
        >
          {loading ? "Applying Filters..." : "Apply Filters"}
        </button>
        {loading && <p className="mt-2">Loading...</p>}
      </div>
    </div>
  );
};

export default RoomFilter;
