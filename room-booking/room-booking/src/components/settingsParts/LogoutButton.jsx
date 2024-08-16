import React from 'react';
import ConfirmationModal from '../common/admin/ConfirmModal';

const LogoutButton = ({ setIsModalOpen, isModalOpen, handleModalConfirm, handleModalCancel }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8 mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </>
  );
};

export default LogoutButton;
