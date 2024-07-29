// components/Modal.js
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

const Modal = React.memo(({ isOpen, onClose, children }) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
});

export default Modal;
