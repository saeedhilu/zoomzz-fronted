// src/axiosInstance.js
import axios from 'axios';
import { store, persistor } from '../redux/store';
import { clearAuth, updateToken } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const state = store.getState();
  const refresh = state.auth.refreshToken;
  
  if (!refresh) {
    console.warn('No refresh token found...');
    return null;
  }
  
  try {
    const response = await instance.post('accounts/api/token/refresh/', {
      refresh,
    });
    const newToken = response.data.access;
    await store.dispatch(updateToken({ accessToken: newToken }));
    return newToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    store.dispatch(clearAuth());
    persistor.purge(); // Clear persisted Redux state

    // Show toast message
    toast.error('Session expired. Please log in again.');

    // Redirect to login page
    const navigate = useNavigate();
    navigate('/login');

    return null;
  }
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
