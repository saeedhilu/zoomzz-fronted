import instance from "../utils/Axiox";

const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await instance.get('accounts/wishlists/');
      console.log('response data fropm whishslist',response);
      return response.data;
    } catch (error) {
      console.error('Error fetching from wishlist', error);
      throw error; 
    }
  },

  addToWishlist: async (room_id) => {
    try {
      const response = await instance.post('accounts/wishlists/', { room_id });
      
      return response.data; 
    } catch (error) {
      console.error('Error adding to wishlist', error);
      throw error; 
    }
  },

  removeFromWishlist: async (wishlistItemId) => {
    
    console.log('whishslist item ide:',wishlistItemId);
  
    try {
      const response = await instance.delete(`accounts/wishlists/${wishlistItemId}/`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist', error);
      throw error; 
    }
  }
};

export default wishlistService;