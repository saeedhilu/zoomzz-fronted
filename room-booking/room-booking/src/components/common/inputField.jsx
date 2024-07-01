// src/components/common/InputField.js
import React from 'react';

const InputField = ({ label, id, type, value, onChange, placeholder, className }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
    )}
    <input
      type={type}
      id={id}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      
    />
  </div>
);

export default InputField;
