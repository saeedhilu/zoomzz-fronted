import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchRooms from '../../services/searchServices';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      const searchParams = {
        search: query.get('search'),
        check_in: query.get('check_in'),
        check_out: query.get('check_out'),
        guest_count: query.get('guest_count'),
      };
      try {
        const data = await searchRooms(searchParams);
        setRooms(data);
      } catch (error) {
        setError('No rooms found.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="border border-gray-200 rounded p-4 mb-4">
            <h3 className="text-xl font-semibold">{room.name}</h3>
            <p className="text-gray-600">{room.description}</p>
            <p className="text-gray-600">Price: ${room.price_per_night} per night</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No rooms found.</p>
      )}
    </div>
  );
};

export default SearchResults;
