// src/store/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
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
      state.firstName = action.payload.firstName || null;
      state.lastName = action.payload.lastName || null;
      state.email = action.payload.email || null;
      state.phoneNumber = action.payload.phoneNumber || null;
      state.profileImage = action.payload.profileImage || null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isSuperAdmin = action.payload.isSuperAdmin || false;
      state.isVendor = action.payload.isVendor || false;
    },
    clearAuth: () => {
      return initialState;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setUser, clearAuth,updatePhoneNumber } = authSlice.actions;

export default authSlice.reducer;
