// src/pages/NotFoundPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/404.gif'

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded  text-center">
        <img src={image} alt="" />
        <button
          className="bg-gray-500  text-white px-4 py-2 rounded-xl"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
