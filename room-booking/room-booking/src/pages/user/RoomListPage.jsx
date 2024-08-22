// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// import { renderStars } from "../../utils/ratingStar";
// import RoomSearch from "../../components/layout/SearchBar";
// import RoomFilter from "../../components/rooms/roomFilter/RoomFilterForm";
// import Navbar from "../../components/layout/Navbar";
// import { useInView } from "react-intersection-observer";
// import instance from "../../utils/Axiox";
// const RoomList = () => {
//   const [rooms, setRooms] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const { ref: loaderRef, inView } = useInView({
//     triggerOnce: false,
//     threshold: 0.5, 
//   });

//   const fetchRooms = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     try {
//       const response = await instance.get(`accounts/room-search/?page=${page}`);
//       console.log('response feropm serachj: ',response);
      
//       const newRooms = response.data.results;

//       setRooms((prevRooms) => [...prevRooms, ...newRooms]);
//       setHasMore(response.data.next !== null);
//       setPage((prevPage) => prevPage + 1);

//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, loading, hasMore]);

//   useEffect(() => {
//     if (inView) {
//       fetchRooms();
//     }
//   }, [inView, fetchRooms]);

//   return (
//     <div>
//       <div className="max-w-6xl mx-auto p-4">
//         <RoomSearch />
//         <RoomFilter />
//         <h1 className="text-3xl font-bold mb-4">Room List</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {rooms.length > 0 ? (
//             rooms.map((room) => (
//               <Link key={room.id} to={`/room-details/${room.id}`}>
//                 <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer">
//                   <img
//                     src={room.image}
//                     alt={room.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
//                     <div className="flex items-center text-gray-600 mb-2">
//                       <FontAwesomeIcon
//                         icon={faMapMarkerAlt}
//                         className="mr-2 text-gray-400"
//                       />
//                       <span>{room.location.name},</span>
//                       <span className="ml-1">{room.location.city},</span>
//                       <span className="ml-1">{room.location.country}</span>
//                     </div>
//                     <p className="text-gray-800 font-bold">
//                       Price: {room.price_per_night} per night
//                     </p>
//                     <div className="flex items-center mt-3">
//                       {renderStars(room.average_rating)}
//                       <span className="text-gray-600 ml-2">
//                         {room.rating_count > 0
//                           ? `${room.rating_count} Reviews`
//                           : "No reviews"}
//                       </span>
//                     </div>
//                     <div className="mt-2 flex items-center space-x-2">
//                       {room.category && (
//                         <div className="flex items-center">
//                           <p className="flex gap-2 text-sm text-gray-600">
//                             <img
//                               className="w-5 h-5"
//                               src={room.category.image}
//                               alt=""
//                             />
//                             {room.category.name}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-2 flex items-center space-x-2">
//                       <p className="text-gray-600">Bed Type:</p>
//                       <p className="text-sm text-gray-600 pl-2 pt-1">
//                         {room.bed_type}
//                       </p>
//                     </div>
//                     <div className="mt-2 flex">
//                       <p className="text-gray-600">Room Type:</p>
//                       <p className="text-sm pl-2 text-gray-800 pt-1">
//                         {room.room_type}
//                       </p>
//                     </div>
//                     <div className="mt-2 flex">
//                       <p className="text-gray-600">Amenities:</p>
//                       <div className="flex flex-wrap items-center ml-1">
//                         {room.amenities.slice(0, 4).map((amenity, idx) => (
//                           <div key={idx}>
//                             <p>{amenity.name}</p>
//                           </div>
//                         ))}
//                         {room.amenities.length > 4 && (
//                           <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
//                             View More
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p>No rooms found.</p>
//           )}
//         </div>
//         {loading && <p className="text-center py-4">Loading more rooms...</p>}
//         <div ref={loaderRef} className="h-1" />
//       </div>
//     </div>
//   );
// };

// export default RoomList;





















// search proper result is 


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { renderStars } from "../../utils/ratingStar";
import RoomSearch from "../../components/layout/SearchBar";
import RoomFilter from "../../components/rooms/roomFilter/RoomFilterForm";
import Navbar from "../../components/layout/Navbar";
const RoomList = () => {
  const location = useLocation();
  const { rooms } = location.state || { rooms: [] };
  console.log('====================================');
  console.log('roos is :',rooms);
  console.log('====================================');
  return (
    <div>
      <div className="max-w-6xl mx-auto p-4">
        <RoomSearch />

        <RoomFilter />

        <h1 className="text-3xl font-bold mb-4">Room List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <Link key={room.id} to={`/room-details/${room.id}`}>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="mr-2 text-gray-400"
                      />
                      <span>{room.location.name},</span>
                      <span className="ml-1">{room.location.city},</span>
                      <span className="ml-1">{room.location.country}</span>
                    </div>
                    <p className="text-gray-800 font-bold">
                      Price: {room.price_per_night} per night
                    </p>
                    <div className="flex items-center mt-3">
                      {renderStars(room.average_rating)}
                      <span className="text-gray-600 ml-2">
                        {room.rating_count > 0
                          ? `${room.rating_count} Reviews`
                          : "No reviews"}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center space-x-2">
                      {room.category && (
                        <div className="flex items-center">
                          
                          <p className="flex text-sm text-gray-600">
                            <img className="w-5 h-5" src={room.category.image} alt="" />
                            {room.category.name}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      
                      <p className="text-gray-600">Bed Type:</p>
                      <p className="text-sm text-gray-600 pl-2 pt-1">
                        {room.bed_type}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <p className="text-gray-600">Room Type:</p>
                      <p className="text-sm pl-2 text-gray-800 pt-1">
                        {room.room_type}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <p className="text-gray-600">Amenities:</p>
                      <div className="flex flex-wrap items-center ml-1">
                        {room.amenities.slice(0, 4).map((amenity,idx) => (
                          <div key={idx}>
                            <p>
                              {amenity.name}
                            </p>
                          </div>
                        ))}
                        {room.amenities.length > 4 && (
                          <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                            View More
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No rooms found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
