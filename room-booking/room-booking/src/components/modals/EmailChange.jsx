import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal"; // If you're using react-modal for modals

const EmailChangeModal = ({
  isOpen,
  onClose,
  onEmailChange,
  otp,
  setOtp,
  otpSent,
  onOtpVerification,
}) => {
  const [newEmail, setNewEmail] = useState("");

  const handleChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleEmailSubmit = () => {
    onEmailChange(newEmail);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = () => {
    onOtpVerification();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Email Change Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Change Email</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
          </button>
        </div>

        {!otpSent ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                New Email:
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={handleEmailSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Enter OTP:
              </label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EmailChangeModal;
