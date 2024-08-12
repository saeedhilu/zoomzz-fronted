import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ImagePreviewModal = ({ isOpen, onClose, selectedImage }) => (
  isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button
          className="absolute top-2 right-2 text-black p-2 rounded-full hover:text-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <img
          className="max-w-screen-sm max-h-screen"
          src={selectedImage}
          alt="Full-size view"
        />
      </div>
    </div>
  ) : null
);

export default ImagePreviewModal;
