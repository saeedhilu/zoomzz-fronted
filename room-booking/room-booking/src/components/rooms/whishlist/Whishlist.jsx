import React, { useEffect, useState } from 'react';
import wishlistService from '../../../services/WhishlistServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBillAlt, faBed, faHeart } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newRoomId, setNewRoomId] = useState('');
  const baseImageUrl = 'http://localhost:8000';

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const data = await wishlistService.getWishlist();
      console.log('wishlisting datta ',data);
      setWishlistItems(data); 
    } catch (error) {
      setError(error.message || 'Error fetching wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!newRoomId) return;
    try {
      await wishlistService.addToWishlist(newRoomId);
      fetchWishlist(); 
      setNewRoomId('');
    } catch (error) {
      setError(error.message || 'Error adding room to wishlist');
    }
  };

  const handleRemoveWishlist = async (wishlistItemId) => {
    
    try {
        console.log('====================================');
        console.log('icon id is ',wishlistItemId);
        console.log('====================================');
      await wishlistService.removeFromWishlist(wishlistItemId);
      console.log('====================================');
      console.log('hwlo');
      console.log('====================================');
      fetchWishlist(); 
    } catch (error) {
      setError(error.message || 'Error removing room from wishlist');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className='bg-gray-600 w-36 h-1'></div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {wishlistItems.map(item => (
          <li key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img className="object-cover w-full h-full" src={`${baseImageUrl}${item.room.image}`} alt="Room" />
            </div>
            <div className="p-4">
              <p className="flex items-center text-gray-600 mb-2 justify-between">
                <div>
                    <FontAwesomeIcon icon={faBed} className="mr-2" />
                {item.room.name}
                </div>
                
                <FontAwesomeIcon  onClick={() => handleRemoveWishlist(item.id)} icon={faHeart} className="text-gray-500 font-2xl h-6 mr-2 cursor-pointer" />

              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {item.room.location.city}, {item.room.location.name}
              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-2" />
                ${item.room.price_per_night}
              </p>
              
               
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
