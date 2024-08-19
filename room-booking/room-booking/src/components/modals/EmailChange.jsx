import React, { useState } from "react";

const EmailChangeModal = ({ onClose, onSave }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailChange = () => {
    onSave(email);
    setOtpSent(true);
  };

  const handleOtpVerification = () => {
    onSave(email, otp);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Email</h2>
        <label className="block mb-2">New Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        {otpSent ? (
          <>
            <label className="block mb-2">Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <button
              onClick={handleOtpVerification}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Verify OTP
            </button>
          </>
        ) : (
          <button
            onClick={handleEmailChange}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Send OTP
          </button>
        )}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded w-full mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailChangeModal;
