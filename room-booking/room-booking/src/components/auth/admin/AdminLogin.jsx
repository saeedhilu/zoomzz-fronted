import React, { useState } from 'react';
import adminLogin from '../../../services/admin/Login';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import { setUser } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const   AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await adminLogin(username, password);
      console.log('====================================');
      console.log('vlaue is :0',data);
      console.log('====================================');
      const {access_token,refresh_token,is_superadmin,profile_image} = data

      dispatch(setUser({
        username:data.username,
        accessToken: access_token,
        refreshToken: refresh_token,
        isSuperAdmin: is_superadmin,
        isVendor: false, 
        profileImage: profile_image,
      }));
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-500"
                required
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-2 mr-3 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
