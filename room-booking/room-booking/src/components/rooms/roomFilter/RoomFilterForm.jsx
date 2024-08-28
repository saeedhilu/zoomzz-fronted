// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import searchRooms from "../../../services/searchServices";
// import getCategories from "../../../services/Categories";
// import getAmenities from "../../../services/Amenity";
// import getRoomTypes from "../../../services/RoomType";
// import getBedTypes from "../../../services/BedType";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter, faTimes, faSort } from "@fortawesome/free-solid-svg-icons";
// import Slider from "@mui/material/Slider";

// const RoomFilter = () => {
//   const [filters, setFilters] = useState({
//     min_price: 0,
//     max_price: 10000,
//     category: [],
//     amenities: [],
//     roomtype: [],
//     bedtype: [],
//     ordering: "",
//   });

//   const [filterOptions, setFilterOptions] = useState({
//     categories: [],
//     amenities: [],
//     roomTypes: [],
//     bedTypes: [],
//   });

//   const [showFilter, setShowFilter] = useState(false);
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

//   useEffect(() => {
//     const applyFilters = async () => {
//       setLoading(true);
//       try {
//         const data = await searchRooms(filters);
//         if (data && data.length === 0) {
//           setError("No Rooms Available");
//         } else {
//           setError("");
//           navigate("/room-list", { state: { rooms: data } });
//         }
//       } catch (error) {
//         console.log(error.response.data.detail);
//         if (error.response && error.response.data.detail) {
//           setError(error.response.data.detail);
//         } else {
//           setError("Failed to filter rooms");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     applyFilters();
//   }, [filters, navigate]);

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       if (checked) {
//         setFilters((prevFilters) => ({
//           ...prevFilters,
//           [name]: [...prevFilters[name], value],
//         }));
//       } else {
//         setFilters((prevFilters) => ({
//           ...prevFilters,
//           [name]: prevFilters[name].filter((item) => item !== value),
//         }));
//       }
//     } else {
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         [name]: value,
//       }));
//     }
//   };

//   const handleRangeChange = (event, newValue) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       min_price: newValue[0],
//       max_price: newValue[1],
//     }));
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
//         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2 mb-4"
//       >
//         <FontAwesomeIcon icon={faFilter} />
//         <span className="ml-2">
//           {showFilter ? "Hide Filters" : "Show Filters"}
//         </span>
//       </button>
//       <div
//         className={`fixed top-0 left-0 w-72 bg-white p-4 border border-gray-300 rounded h-full transform transition-transform overflow-y-auto ${
//           showFilter
//             ? "translate-x-0 shadow-gray-600 shadow-xl"
//             : "-translate-x-full"
//         }`}
//       >
//         <button
//           onClick={() => setShowFilter(false)}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
//         >
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//         <h2 className="text-lg font-bold mb-4">Room Filters</h2>
//         {error && <p className="text-red-500 mb-4"> {error}</p>}
//         <div className="mb-4">
//           <label className="block mb-2">Price Range:</label>
//           <Slider
//             value={[filters.min_price, filters.max_price]}
//             onChange={handleRangeChange}
//             valueLabelDisplay="auto"
//             min={0}
//             max={10000}
//             step={10}
//             sx={{
//               color: "#6b7280",
//               "& .MuiSlider-thumb": {
//                 backgroundColor: "#6b7280",
//               },
//               "& .MuiSlider-rail": {
//                 backgroundColor: "#d3d3d3",
//               },
//               "& .MuiSlider-track": {
//                 backgroundColor: "#6b7280",
//               },
//             }}
//           />
//           <p className="mt-2">
//             Selected Price Range: {filters.min_price} - {filters.max_price}
//           </p>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Category:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.categories.map((category) => (
//               <div key={category.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="category"
//                   id={`category_${category.id}`}
//                   value={category.id.toString()}
//                   checked={filters.category.includes(category.id.toString())}
//                   onChange={handleFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`category_${category.id}`}>
//                   {category.name}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Amenities:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.amenities.map((amenity) => (
//               <div key={amenity.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="amenities"
//                   id={`amenity_${amenity.id}`}
//                   value={amenity.id.toString()}
//                   checked={filters.amenities.includes(amenity.id.toString())}
//                   onChange={handleFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`amenity_${amenity.id}`}>{amenity.name}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Room Type:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.roomTypes.map((roomType) => (
//               <div key={roomType.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="roomtype"
//                   id={`roomtype_${roomType.id}`}
//                   value={roomType.id.toString()}
//                   checked={filters.roomtype.includes(roomType.id.toString())}
//                   onChange={handleFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`roomtype_${roomType.id}`}>
//                   {roomType.name}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Bed Type:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.bedTypes.map((bedType) => (
//               <div key={bedType.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="bedtype"
//                   id={`bedtype_${bedType.id}`}
//                   value={bedType.id.toString()}
//                   checked={filters.bedtype.includes(bedType.id.toString())}
//                   onChange={handleFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`bedtype_${bedType.id}`}>{bedType.name}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="absolute top-0 right-0 bg-white p-4 border-b border-gray-300 rounded flex h-full overflow-y-auto">
//         <label htmlFor="ordering" className="mr-2">
//           Ordered By
//         </label>
//         <div className="flex items-center mb-2">
//           <select
//             name="ordering"
//             id="ordering"
//             value={filters.ordering}
//             onChange={handleFilterChange}
//             className="px-2 py-1  appearance-none focus:outline-none "
//           >
//             <option className="bg-gray-400 hover:bg-white" value="">
//               Select ordering
//             </option>
//             <option value="price">Price: Low to High</option>
//             <option value="-price">Price: High to Low</option>
//           </select>

//           <FontAwesomeIcon icon={faSort} className="text-gray-500 mr-2 mt-1" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomFilter;














// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import searchRooms from "../../../services/searchServices";
// // import getCategories from "../../../services/Categories";
// // import getAmenities from "../../../services/Amenity";
// // import getRoomTypes from "../../../services/RoomType";
// // import getBedTypes from "../../../services/BedType";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

// // const RoomFilter = () => {
// //   const [filters, setFilters] = useState({
// //     min_price: "",
// //     max_price: "",
// //     category: [],
// //     amenities: [],
// //     roomtype: [],
// //     bedtype: [],
// //     ordering: "",
// //   });

// //   const [filterOptions, setFilterOptions] = useState({
// //     categories: [],
// //     amenities: [],
// //     roomTypes: [],
// //     bedTypes: [],
// //   });

// //   const [showFilter, setShowFilter] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchFilterOptions = async () => {
// //       setLoading(true);
// //       try {
// //         const [
// //           categoriesResponse,
// //           amenitiesResponse,
// //           roomTypesResponse,
// //           bedTypesResponse,
// //         ] = await Promise.all([
// //           getCategories(),
// //           getAmenities(),
// //           getRoomTypes(),
// //           getBedTypes(),
// //         ]);

// //         setFilterOptions({
// //           categories: categoriesResponse,
// //           amenities: amenitiesResponse,
// //           roomTypes: roomTypesResponse,
// //           bedTypes: bedTypesResponse,
// //         });
// //       } catch (error) {
// //         console.error("Error fetching filter options:", error);
// //         setError("Failed to fetch filter options");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFilterOptions();
// //   }, []);

// //   const handleFilterChange = (e) => {
// //     const { name, value, type, checked } = e.target;

// //     if (type === "checkbox") {
// //       if (checked) {
// //         setFilters((prevFilters) => ({
// //           ...prevFilters,
// //           [name]: [...prevFilters[name], value],
// //         }));
// //       } else {
// //         setFilters((prevFilters) => ({
// //           ...prevFilters,
// //           [name]: prevFilters[name].filter((item) => item !== value),
// //         }));
// //       }
// //     } else {
// //       setFilters((prevFilters) => ({
// //         ...prevFilters,
// //         [name]: value,
// //       }));
// //     }
// //   };

// //   const applyFilters = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await searchRooms(filters);
// //       navigate("/room-list", { state: { rooms: data } });
// //     } catch (error) {
// //       console.error("Error filtering rooms:", error);
// //       setError("Failed to filter rooms");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="relative ">
// //       <button
// //         onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
// //         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2 mb-4"
// //       >
// //         <FontAwesomeIcon icon={faFilter} />
// //         <span className="ml-2">{showFilter ? "Hide Filters" : "Show Filters"}</span>
// //       </button>
// //       <div
// //         className={`fixed top-0 left-0 w-72 bg-white p-4 border border-gray-300 rounded h-full transform transition-transform overflow-y-auto ${
// //           showFilter ? "translate-x-0 shadow-gray-600 shadow-xl" : "-translate-x-full "
// //         }`}
// //       >
// //         <button
// //           onClick={() => setShowFilter(false)}
// //           className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
// //         >
// //           <FontAwesomeIcon icon={faTimes} />
// //         </button>
// //         <h2 className="text-lg font-bold mb-4">Room Filters</h2>
// //         {error && <p className="text-red-500 mb-4">Error: {error}</p>}
// //         <div className="mb-2">
// //           <label htmlFor="min_price" className="mr-2">
// //             Min Price:
// //           </label>
// //           <input
// //             type="number"
// //             name="min_price"
// //             id="min_price"
// //             value={filters.min_price}
// //             onChange={handleFilterChange}
// //             className="px-2 py-1 border  border-gray-300 rounded"
// //           />
// //         </div>
// //         <div className="mb-2">
// //           <label htmlFor="max_price" className="mr-2">
// //             Max Price:
// //           </label>
// //           <input
// //             type="number"
// //             name="max_price"
// //             id="max_price"
// //             value={filters.max_price}
// //             onChange={handleFilterChange}
// //             className="px-2 py-1 border border-gray-300 rounded"
// //           />
// //         </div>
// //         <div className="mb-2">
// //           <label className="mr-2">Category:</label>
// //           <div className="flex flex-wrap">
// //             {filterOptions.categories.map((category) => (
// //               <div key={category.id} className="w-1/2 mb-2">
// //                 <input
// //                   type="checkbox"
// //                   name="category"
// //                   id={`category_${category.id}`}
// //                   value={category.id.toString()}
// //                   checked={filters.category.includes(category.id.toString())}
// //                   onChange={handleFilterChange}
// //                   className="mr-2 accent-gray-600"
// //                 />
// //                 <label htmlFor={`category_${category.id}`}>{category.name}</label>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="mb-2">
// //           <label className="mr-2">Amenities:</label>
// //           <div className="flex flex-wrap">
// //             {filterOptions.amenities.map((amenity) => (
// //               <div key={amenity.id} className="w-1/2 mb-2">
// //                 <input
// //                   type="checkbox"
// //                   name="amenities"
// //                   id={`amenity_${amenity.id}`}
// //                   value={amenity.id.toString()}
// //                   checked={filters.amenities.includes(amenity.id.toString())}
// //                   onChange={handleFilterChange}
// //                   className="mr-2 accent-gray-600"
// //                 />
// //                 <label htmlFor={`amenity_${amenity.id}`}>{amenity.name}</label>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="mb-2">
// //           <label className="mr-2">Room Type:</label>
// //           <div className="flex flex-wrap">
// //             {filterOptions.roomTypes.map((roomType) => (
// //               <div key={roomType.id} className="w-1/2 mb-2">
// //                 <input
// //                   type="checkbox"
// //                   name="roomtype"
// //                   id={`roomtype_${roomType.id}`}
// //                   value={roomType.id.toString()}
// //                   checked={filters.roomtype.includes(roomType.id.toString())}
// //                   onChange={handleFilterChange}
// //                   className="mr-2 accent-gray-600"
// //                 />
// //                 <label htmlFor={`roomtype_${roomType.id}`}>{roomType.name}</label>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="mb-2">
// //           <label className="mr-2">Bed Type:</label>
// //           <div className="flex flex-wrap">
// //             {filterOptions.bedTypes.map((bedType) => (
// //               <div key={bedType.id} className="w-1/2 mb-2">
// //                 <input
// //                   type="checkbox"
// //                   name="bedtype"
// //                   id={`bedtype_${bedType.id}`}
// //                   value={bedType.id.toString()}
// //                   checked={filters.bedtype.includes(bedType.id.toString())}
// //                   onChange={handleFilterChange}
// //                   className="mr-2 accent-gray-600"
// //                 />
// //                 <label htmlFor={`bedtype_${bedType.id}`}>{bedType.name}</label>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="mb-2">
// //           <label htmlFor="ordering" className="mr-2">
// //             Ordering:
// //           </label>
// //           <select
// //             name="ordering"
// //             id="ordering"
// //             value={filters.ordering}
// //             onChange={handleFilterChange}
// //             className="px-2 py-1 border border-gray-300 rounded"
// //           >
// //             <option value="">Select ordering</option>
// //             <option value="price">Price: Low to High</option>
// //             <option value="-price">Price: High to Low</option>
// //           </select>
// //         </div>

// //         <button
// //           onClick={applyFilters}
// //           disabled={loading}
// //           className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2"
// //         >
// //           {loading ? "Applying Filters..." : "Apply Filters"}
// //         </button>
// //         {loading && <p className="mt-2">Loading...</p>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RoomFilter;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchRooms from "../../../services/searchServices";
import getCategories from "../../../services/Categories";
import getAmenities from "../../../services/Amenity";
import getRoomTypes from "../../../services/RoomType";
import getBedTypes from "../../../services/BedType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes, faSort} from "@fortawesome/free-solid-svg-icons";
import Slider from "@mui/material/Slider";

const RoomFilter = () => {
  const [filters, setFilters] = useState({
    category: [],
    amenities: [],
    roomtype: [],
    bedtype: [],
    ordering: "",
    min_price: 0,
    max_price: 10000,
  });

  const [tempPriceRange, setTempPriceRange] = useState([0, 10000]);

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

  const applyFilters = async (updatedFilters) => {
    setLoading(true);
    try {
      const data = await searchRooms(updatedFilters);
      if (data && data.length === 0) {
        setError("No Rooms Available");
      } else {
        setError("");
        navigate("/room-list", { state: { rooms: data } });
      }
    } catch (error) {
      console.log(error.response.data.detail);
      if (error.response && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to filter rooms");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDynamicFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedFilters;
    if (type === "checkbox") {
      if (checked) {
        updatedFilters = {
          ...filters,
          [name]: [...filters[name], value],
        };
      } else {
        updatedFilters = {
          ...filters,
          [name]: filters[name].filter((item) => item !== value),
        };
      }
    } else {
      updatedFilters = {
        ...filters,
        [name]: value,
      };
    }

    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleRangeChange = (event, newValue) => {
    setTempPriceRange(newValue);
  };

  const applyPriceRange = () => {
    const updatedFilters = {
      ...filters,
      min_price: tempPriceRange[0],
      max_price: tempPriceRange[1],
    };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleOrderChange = (e) => {
    const { value } = e.target;
    const updatedFilters = {
      ...filters,
      ordering: value,
    };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          <FontAwesomeIcon icon={faFilter} />
          <span className="ml-2">
            {showFilter ? "Hide Filters" : "Show Filters"}
          </span>
        </button>
        <div className="flex items-center">
          <label className="mr-2 hidden md:block">Order By:</label>
          <FontAwesomeIcon icon={faSort} />
          <select
            name="ordering"
            value={filters.ordering}
            onChange={handleOrderChange}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          >
            <option value="">Select ordering </option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-72 bg-white p-4 border border-gray-300 rounded h-full transform transition-transform overflow-y-auto ${
          showFilter
            ? "translate-x-0 shadow-gray-600 shadow-xl"
            : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setShowFilter(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-lg font-bold mb-4">Room Filters</h2>
        {error && <p className="text-red-500 mb-4"> {error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Price Range:</label>
          <Slider
            value={tempPriceRange}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={10}
            sx={{
              color: "#6b7280",
              "& .MuiSlider-thumb": {
                backgroundColor: "#6b7280",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#d3d3d3",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#6b7280",
              },
            }}
          />
          <p className="mt-2">
            Selected Price Range: {tempPriceRange[0]} - {tempPriceRange[1]}
          </p>
          <button
            onClick={applyPriceRange}
            className="bg-gray-500 hover:bg-gray-600 transition duration-300  text-white px-4 py-2 rounded mt-4"
          >
            Apply Price Range
          </button>
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
                  onChange={handleDynamicFilterChange}
                  className="mr-2 accent-gray-600"
                />
                <label htmlFor={`category_${category.id}`}>
                  {category.name}
                </label>
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
                  onChange={handleDynamicFilterChange}
                  className="mr-2 accent-gray-600"
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
                  onChange={handleDynamicFilterChange}
                  className="mr-2 accent-gray-600"
                />
                <label htmlFor={`roomtype_${roomType.id}`}>
                  {roomType.name}
                </label>
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
                  onChange={handleDynamicFilterChange}
                  className="mr-2 accent-gray-600"
                />
                <label htmlFor={`bedtype_${bedType.id}`}>{bedType.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;
  




// after adding spinner 




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import searchRooms from "../../../services/searchServices";
// import getCategories from "../../../services/Categories";
// import getAmenities from "../../../services/Amenity";
// import getRoomTypes from "../../../services/RoomType";
// import getBedTypes from "../../../services/BedType";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
// import Slider from "@mui/material/Slider";
// import ClipLoader from "react-spinners/ClipLoader";

// const RoomFilter = () => {
//   const [filters, setFilters] = useState({
//     category: [],
//     amenities: [],
//     roomtype: [],
//     bedtype: [],
//     ordering: "",
//     min_price: 0,
//     max_price: 10000,
//   });

//   const [tempPriceRange, setTempPriceRange] = useState([0, 10000]);

//   const [filterOptions, setFilterOptions] = useState({
//     categories: [],
//     amenities: [],
//     roomTypes: [],
//     bedTypes: [],
//   });

//   const [showFilter, setShowFilter] = useState(false);
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

//   const applyFilters = async (updatedFilters) => {
//     setLoading(true);
//     try {
//       const data = await searchRooms(updatedFilters);
//       if (data && data.length === 0) {
//         setError("No Rooms Available");
//       } else {
//         setError("");
//         // Introduce a delay to show the spinner for at least 1 second
//         setTimeout(() => {
//           setLoading(false);
//           navigate("/room-list", { state: { rooms: data } });
//         }, 1000); // 1 second delay
//       }
//     } catch (error) {
//       console.log(error.response.data.detail);
//       if (error.response && error.response.data.detail) {
//         setError(error.response.data.detail);
//       } else {
//         setError("Failed to filter rooms");
//       }
//       setLoading(false); // Ensure loading state is turned off in case of error
//     }
//   };

//   const handleDynamicFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     let updatedFilters;
//     if (type === "checkbox") {
//       if (checked) {
//         updatedFilters = {
//           ...filters,
//           [name]: [...filters[name], value],
//         };
//       } else {
//         updatedFilters = {
//           ...filters,
//           [name]: filters[name].filter((item) => item !== value),
//         };
//       }
//     } else {
//       updatedFilters = {
//         ...filters,
//         [name]: value,
//       };
//     }

//     setFilters(updatedFilters);
//     applyFilters(updatedFilters);
//   };

//   const handleRangeChange = (event, newValue) => {
//     setTempPriceRange(newValue);
//   };

//   const applyPriceRange = () => {
//     const updatedFilters = {
//       ...filters,
//       min_price: tempPriceRange[0],
//       max_price: tempPriceRange[1],
//     };
//     setFilters(updatedFilters);
//     applyFilters(updatedFilters);
//   };

//   const handleOrderChange = (e) => {
//     const { value } = e.target;
//     const updatedFilters = {
//       ...filters,
//       ordering: value,
//     };
//     setFilters(updatedFilters);
//     applyFilters(updatedFilters);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
//         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2 mb-4"
//       >
//         <FontAwesomeIcon icon={faFilter} />
//         <span className="ml-2">
//           {showFilter ? "Hide Filters" : "Show Filters"}
//         </span>
//       </button>
//       <div
//         className={`fixed top-0 left-0 w-72 bg-white p-4 border border-gray-300 rounded h-full transform transition-transform overflow-y-auto ${
//           showFilter
//             ? "translate-x-0 shadow-gray-600 shadow-xl"
//             : "-translate-x-full"
//         }`}
//       >
//         <button
//           onClick={() => setShowFilter(false)}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
//         >
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//         <h2 className="text-lg font-bold mb-4">Room Filters</h2>
//         {error && <p className="text-red-500 mb-4"> {error}</p>}
//         <div className="mb-4">
//           <label className="block mb-2">Price Range:</label>
//           <Slider
//             value={tempPriceRange}
//             onChange={handleRangeChange}
//             valueLabelDisplay="auto"
//             min={0}
//             max={10000}
//             step={10}
//             sx={{
//               color: "#6b7280",
//               "& .MuiSlider-thumb": {
//                 backgroundColor: "#6b7280",
//               },
//               "& .MuiSlider-rail": {
//                 backgroundColor: "#d3d3d3",
//               },
//               "& .MuiSlider-track": {
//                 backgroundColor: "#6b7280",
//               },
//             }}
//           />
//           <p className="mt-2">
//             Selected Price Range: {tempPriceRange[0]} - {tempPriceRange[1]}
//           </p>
//           <button
//             onClick={applyPriceRange}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
//           >
//             Apply Price Range
//           </button>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Category:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.categories.map((category) => (
//               <div key={category.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="category"
//                   id={`category_${category.id}`}
//                   value={category.id.toString()}
//                   checked={filters.category.includes(category.id.toString())}
//                   onChange={handleDynamicFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`category_${category.id}`}>
//                   {category.name}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Amenities:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.amenities.map((amenity) => (
//               <div key={amenity.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="amenities"
//                   id={`amenity_${amenity.id}`}
//                   value={amenity.id.toString()}
//                   checked={filters.amenities.includes(amenity.id.toString())}
//                   onChange={handleDynamicFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`amenity_${amenity.id}`}>{amenity.name}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Room Type:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.roomTypes.map((roomType) => (
//               <div key={roomType.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="roomtype"
//                   id={`roomtype_${roomType.id}`}
//                   value={roomType.id.toString()}
//                   checked={filters.roomtype.includes(roomType.id.toString())}
//                   onChange={handleDynamicFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`roomtype_${roomType.id}`}>
//                   {roomType.name}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-2">
//           <label className="mr-2">Bed Type:</label>
//           <div className="flex flex-wrap">
//             {filterOptions.bedTypes.map((bedType) => (
//               <div key={bedType.id} className="w-1/2 mb-2">
//                 <input
//                   type="checkbox"
//                   name="bedtype"
//                   id={`bedtype_${bedType.id}`}
//                   value={bedType.id.toString()}
//                   checked={filters.bedtype.includes(bedType.id.toString())}
//                   onChange={handleDynamicFilterChange}
//                   className="mr-2 accent-gray-600"
//                 />
//                 <label htmlFor={`bedtype_${bedType.id}`}>{bedType.name}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="ordering" className="block mb-2">
//             Order By:
//           </label>
//           <select
//             name="ordering"
//             value={filters.ordering}
//             onChange={handleOrderChange}
//             className="border border-gray-300 rounded px-2 py-1"
//           >
//             <option value="">Default</option>
//             <option value="price">Price: Low to High</option>
//             <option value="-price">Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//           <ClipLoader color="#000000" loading={loading} size={50} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomFilter;
