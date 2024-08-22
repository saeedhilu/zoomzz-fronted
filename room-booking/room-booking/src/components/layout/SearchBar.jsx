import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, CalendarIcon, UsersIcon } from '@heroicons/react/outline';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import searchRooms from '../../services/searchServices';
import Spinner from '../Spinner/Spinner'; // Import your Spinner component

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [guestCount, setGuestCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const searchParams = {
      search: searchQuery,
      check_in: formatDate(dates[0]),
      check_out: formatDate(dates[1]),
      guest_count: guestCount,
    };

    try {
      const data = await searchRooms(searchParams);
      console.log('data from serach:',data);
      
      navigate('/room-list', { state: { rooms: data } });
    } catch (error) {
      
      setError(error.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-4">
        <div className="sm:hidden">
          <div className="bg-white shadow-md p-4 rounded-full flex items-center sm:space-x-4">
            <div className="flex-1 sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Enter location, hotel name, etc."
                />
              </div>
            </div>
            <div className="flex-1 sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Flatpickr
                  options={{ mode: 'range', dateFormat: 'Y-m-d' }}
                  value={dates}
                  onChange={(selectedDates) => setDates(selectedDates)}
                  className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Select date range"
                />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-full flex items-center sm:space-x-4 mt-4">
            <div className="flex-1 sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="number"
                  id="guestCount"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Number of guests"
                />
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              <button
                onClick={handleSearch}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto w-full relative"
                style={{ minHeight: '40px' }} // Ensure a minimum height to contain the spinner
              >
                {loading && <Spinner className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                {!loading && 'Search'}
              </button>
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="bg-white shadow-md p-4 rounded-full flex items-center sm:space-x-4">
            <div className="flex-1 sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Enter location, hotel name, etc."
                />
              </div>
            </div>
            <div className="flex-1 sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Flatpickr
                  options={{ mode: 'range', dateFormat: 'Y-m-d' }}
                  value={dates}
                  onChange={(selectedDates) => setDates(selectedDates)}
                  className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Select date range"
                />
              </div>
            </div>
            <div className="flex-1 sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="number"
                  id="guestCount"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Number of guests"
                />
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              <button
                onClick={handleSearch}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto w-full relative"
                style={{ minHeight: '40px' }} // Ensure a minimum height to contain the spinner
              >
                
                {!loading && 'Search'}
              </button>
            </div>
          </div>
        </div>
        {loading &&
        <div className='inset-0 fixed bg-white w-auto h-[100%] z-50'>
            <Spinner className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
         
         
         }
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RoomSearch;

















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SearchIcon, CalendarIcon, UsersIcon } from '@heroicons/react/outline';
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/flatpickr.css';
// import searchRooms from '../../services/searchServices';

// const RoomSearch = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [dates, setDates] = useState([new Date(), new Date()]);
//   const [guestCount, setGuestCount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = (`0${d.getMonth() + 1}`).slice(-2);
//     const day = (`0${d.getDate()}`).slice(-2);
//     return `${year}-${month}-${day}`;
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     setError(null);
//     const searchParams = {
//       search: searchQuery,
//       check_in: formatDate(dates[0]),
//       check_out: formatDate(dates[1]),
//       guest_count: guestCount,
//     };
//     try {
//       const data = await searchRooms(searchParams);
//       navigate('/search-results', { state: { rooms: data } });
//     } catch (error) {
//       setError('No rooms found.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="space-y-4">
//         {/* Search bar for mobile screens */}
//         <div className="sm:hidden">
//           <div className="bg-white shadow-md p-4 rounded-full flex items-center sm:space-x-4">
//             <div className="flex-1 sm:w-auto">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="text"
//                   id="searchQuery"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//                   placeholder="Enter location, hotel name, etc."
//                 />
//               </div>
//             </div>
//             <div className="flex-1 sm:w-auto">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <Flatpickr
//                   options={{ mode: 'range', dateFormat: 'Y-m-d' }}
//                   value={dates}
//                   onChange={(selectedDates) => setDates(selectedDates)}
//                   className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//                   placeholder="Select date range"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white shadow-md p-4 rounded-full flex items-center sm:space-x-4 mt-4">
//             <div className="flex-1 sm:w-auto">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="number"
//                   id="guestCount"
//                   value={guestCount}
//                   onChange={(e) => setGuestCount(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//                   placeholder="Number of guests"
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 onClick={handleSearch}
//                 className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto w-full"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Search bar for larger screens */}
//         <div className="hidden sm:block">
//           <div className="bg-white shadow-md p-4 rounded-full flex items-center sm:space-x-4">
//             <div className="flex-1 sm:w-auto">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="text"
//                   id="searchQuery"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//                   placeholder="Enter location, hotel name, etc."
//                 />
//               </div>
//             </div>
//             <div className="flex-1 sm:w-auto">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <Flatpickr
//                   options={{ mode: 'range', dateFormat: 'Y-m-d' }}
//                   value={dates}
//                   onChange={(selectedDates) => setDates(selectedDates)}
//                   className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//                   placeholder="Select date range"
//                 />
//               </div>
//             </div>
//             <div className="flex-1 sm:w-auto">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="number"
//                   id="guestCount"
//                   value={guestCount}
//                   onChange={(e) => setGuestCount(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//                   placeholder="Number of guests"
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 onClick={handleSearch}
//                 className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto w-full"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
//       {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default RoomSearch;




