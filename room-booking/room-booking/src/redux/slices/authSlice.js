// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: null,
  profileImage: null,
  accessToken: null,
  refreshToken: null,
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
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.profileImage = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
