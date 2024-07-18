// axiosInstance.js
import axios from 'axios';
import { store } from '../redux/store'; 

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken; 
    
    console.log('====================================');
    console.log('access token from axions filoe ',token);
    console.log('====================================');
    if (token) {
      
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;
