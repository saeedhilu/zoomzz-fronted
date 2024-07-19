// src/store/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: null,
  profileImage: null,
  accessToken: null,
  refreshToken: null,
  isSuperAdmin: false,
  isVendor: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.profileImage = action.payload.profileImage || null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isSuperAdmin = action.payload.isSuperAdmin || false;
      state.isVendor = action.payload.isVendor || false;
    },
    clearAuth: () => {
  
      return initialState;
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
