import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    console.log('====================================');
    console.log(oncancel);
    console.log('====================================');
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-900/50">
      <article className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{message}</h2>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            aria-label="Cancel action"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
            aria-label="Confirm action"
          >
            Confirm
          </button>
        </div>
      </article>
    </div>
  );
};

export default ConfirmationModal;
