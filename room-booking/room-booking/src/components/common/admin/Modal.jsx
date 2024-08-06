// src/components/common/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
        <header className="p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </header>
        <div className="p-4">{children}</div>
        <footer className="p-4 border-t flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onSubmit}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
