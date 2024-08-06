// src/components/common/AddNewButton.js
import React from 'react';

const AddNewButton = ({ onClick, label }) => {
  return (
    <button
      className="bg-gray-600 p-3 rounded-lg text-white hover:bg-gray-800"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AddNewButton;
