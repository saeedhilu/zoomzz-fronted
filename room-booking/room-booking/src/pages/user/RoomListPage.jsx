import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { renderStars } from '../../utils/ratingStar';
import RoomSearch from '../../components/layout/SearchBar';
import RoomFilter from '../../components/rooms/roomFilter/RoomFilterForm';
import { useInView } from 'react-intersection-observer';
import instance from '../../utils/Axiox';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Spinner from '../../components/Spinner/Spinner';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  console.log('====================================');
  console.log('room is :',rooms);
  console.log('====================================');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    search: '',
    check_in: '',
    check_out: '',
    guest_count: '',
  });

  const { ref: loaderRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const fetchRooms = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = {
        search: searchParams.search || undefined,
        check_in: searchParams.check_in || undefined,
        check_out: searchParams.check_out || undefined,
        guest_count: searchParams.guest_count || undefined,
        page: page,
      };

      const response = await instance.get('accounts/room-search/', { params });

      if (response.data && response.data.results) {
        const newRooms = response.data.results;

        // Filter out rooms that are already in the state
        setRooms((prevRooms) => {
          const prevRoomIds = new Set(prevRooms.map((room) => room.id));
          const filteredRooms = newRooms.filter((room) => !prevRoomIds.has(room.id));
          return [...prevRooms, ...filteredRooms];
        });

        setHasMore(response.data.next !== null);
        setPage((prevPage) => prevPage + 1);
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, searchParams]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchRooms();
    }
  }, [inView, hasMore, loading, fetchRooms]);

  const handleSearchChange = (params) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      ...params,
    }));
    setRooms([]); // Clear rooms
    setPage(1); // Reset page to 1
    setHasMore(true); 
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4">
        <RoomSearch onSearchChange={handleSearchChange} />
        <RoomFilter onFilterChange={handleSearchChange} />

        <h1 className="text-3xl font-bold mb-4">Room List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.length > 0 ? (
            rooms.map((room, idx) => (
             
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer">
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    transitionTime={500}
                    interval={3000}
                  >
                    {[room.image, room.image2, room.image3, room.image4, room.image5].map(
                      (img, index) => (
                        img && (
                          <div key={index}>
                            <img
                              src={img}
                              alt={`${room.name} - ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )
                      )
                    )}
                  </Carousel>
                  <Link key={idx} to={`/room-details/${room.id}`}>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="mr-2 text-gray-400"
                      />
                      <span>{room.location.name},</span>
                      <span className="ml-1">{room.location.city_name},</span>
                      <span className="ml-1">{room.location.country_name}</span>
                    </div>
                    <p className="text-gray-800 font-bold">
                      Price: {room.price_per_night} per night
                    </p>
                    <div className="flex items-center mt-3">
                      {renderStars(room.average_rating)}
                      <span className="text-gray-600 ml-2">
                        {room.rating_count > 0
                          ? `${room.rating_count} Reviews`
                          : 'No reviews'}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      {room.category && (
                        <div className="flex items-center">
                          <p className="flex gap-2 text-sm text-gray-600">
                            <img
                              className="w-5 h-5"
                              src={room.category.image}
                              alt=""
                            />
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
                        {room.amenities.slice(0, 4).map((amenity, idx) => (
                          <div key={idx}>
                            <p>{amenity.name}</p>
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
                  </Link>
                </div>
              
            ))
          ) : (
            <p></p>
          )}
        </div>

        {loading && <p className="text-center py-4"><Spinner/></p>}
        <div ref={loaderRef} className="h-1" />
      </div>
    </div>
  );
};

export default RoomList;











// import React, { useEffect, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import { renderStars } from '../../utils/ratingStar';
// import RoomSearch from '../../components/layout/SearchBar';
// import RoomFilter from '../../components/rooms/roomFilter/RoomFilterForm';
// import { useInView } from 'react-intersection-observer';
// import instance from '../../utils/Axiox';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
// import Spinner from '../../components/Spinner/Spinner';

// const RoomList = () => {
//   const [rooms, setRooms] = useState([]);

//   console.log('====================================');
//   console.log('room is :',rooms);
//   console.log('====================================');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [searchParams, setSearchParams] = useState({
//     search: '',
//     check_in: '',
//     check_out: '',
//     guest_count: '',
//   });

//   const { ref: loaderRef, inView } = useInView({
//     triggerOnce: false,
//     threshold: 0.5,
//   });

//   const fetchRooms = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     try {
//       const params = {
//         search: searchParams.search || undefined,
//         check_in: searchParams.check_in || undefined,
//         check_out: searchParams.check_out || undefined,
//         guest_count: searchParams.guest_count || undefined,
//         page: page,
//       };

//       const response = await instance.get('accounts/room-search/', { params });

//       if (response.data && response.data.results) {
//         const newRooms = response.data.results;

//         // Filter out rooms that are already in the state
//         setRooms((prevRooms) => {
//           const prevRoomIds = new Set(prevRooms.map((room) => room.id));
//           const filteredRooms = newRooms.filter((room) => !prevRoomIds.has(room.id));
//           return [...prevRooms, ...filteredRooms];
//         });

//         setHasMore(response.data.next !== null);
//         setPage((prevPage) => prevPage + 1);
//       } else {
//         throw new Error('Unexpected API response structure');
//       }
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, loading, hasMore, searchParams]);

//   useEffect(() => {
//     fetchRooms();
//   }, [fetchRooms]);

//   useEffect(() => {
//     if (inView && hasMore && !loading) {
//       fetchRooms();
//     }
//   }, [inView, hasMore, loading, fetchRooms]);

//   const handleSearchChange = (params) => {
//     setSearchParams((prevParams) => ({
//       ...prevParams,
//       ...params,
//     }));
//     setRooms([]); // Clear rooms
//     setPage(1); // Reset page to 1
//     setHasMore(true); // Reset hasMore
//   };

//   return (
//     <div>
//       <div className="max-w-6xl mx-auto p-4">
//         <RoomSearch onSearchChange={handleSearchChange} />
//         <RoomFilter onFilterChange={handleSearchChange} />

//         <h1 className="text-3xl font-bold mb-4">Room List</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {rooms.length > 0 ? (
//             rooms.map((room, idx) => (
//               <Link key={idx} to={`/room-details/${room.id}`}>
//                 <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer">
//                   <Carousel
//                     showThumbs={false}
//                     showStatus={false}
//                     autoPlay
//                     infiniteLoop
//                     transitionTime={500}
//                     interval={3000}
//                   >
//                     {[room.image, room.image2, room.image3, room.image4, room.image5].map(
//                       (img, index) => (
//                         img && (
//                           <div key={index}>
//                             <img
//                               src={img}
//                               alt={`${room.name} - ${index + 1}`}
//                               className="w-full h-48 object-cover"
//                             />
//                           </div>
//                         )
//                       )
//                     )}
//                   </Carousel>
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
//                     <div className="flex items-center text-gray-600 mb-2">
//                       <FontAwesomeIcon
//                         icon={faMapMarkerAlt}
//                         className="mr-2 text-gray-400"
//                       />
//                       <span>{room.location.name},</span>
//                       <span className="ml-1">{room.location.city_name},</span>
//                       <span className="ml-1">{room.location.country_name}</span>
//                     </div>
//                     <p className="text-gray-800 font-bold">
//                       Price: {room.price_per_night} per night
//                     </p>
//                     <div className="flex items-center mt-3">
//                       {renderStars(room.average_rating)}
//                       <span className="text-gray-600 ml-2">
//                         {room.rating_count > 0
//                           ? `${room.rating_count} Reviews`
//                           : 'No reviews'}
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

//         {loading && <p className="text-center py-4"><Spinner/></p>}
//         <div ref={loaderRef} className="h-1" />
//       </div>
//     </div>
//   );
// };

// export default RoomList;
