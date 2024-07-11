import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  accessToken: null,
  refreshToken: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username || null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.username = null;
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;


const persistConfig = {
  key: 'auth', 
  storage, 
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedReducer;
