import React, { useState } from 'react';

const LogoutPage = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end">
              <button
                // onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                // onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
    };
    
export default LogoutPage;
