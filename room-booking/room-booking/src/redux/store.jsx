import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slices/authSlice';
import wishlistSlice from './slices/whishlistSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedWishlistReducer = persistReducer(persistConfig, wishlistSlice); 

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    wishlist: persistedWishlistReducer, 
  },
});

const persistor = persistStore(store);

export { store, persistor };
