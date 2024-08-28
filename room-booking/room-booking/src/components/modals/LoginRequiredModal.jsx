import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/signin');
    onClose(); // Close the modal after redirecting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login Required</h2>
        <p className="mb-4">You need to be logged in to add this room to your wishlist.</p>
        <div className="flex gap-4">
          <button onClick={handleLoginRedirect} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Go to Login
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
