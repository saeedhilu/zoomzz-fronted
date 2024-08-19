import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { UpdatesendOtp } from "../../services/common/PhoneNumberChanging";
import VeriyUpdatePhoneNumber from "../../services/common/VeriyPhoneNumberChange";

export const PhoneNumberChangeModal = ({ onRequestClose, onPhoneNumberUpdated }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let timer;
    if (success || error) {
      timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success, error]);

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await UpdatesendOtp(phoneNumber);
      setIsOtpSent(true);
      setSuccess("OTP sent successfully. Please check your phone.");
    } catch (err) {
      const errorMessage =
        err.response?.data?.phone_number?.[0] ||
        "Failed to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await VeriyUpdatePhoneNumber(phoneNumber, otp);
      setSuccess("Phone number updated successfully.");
      onPhoneNumberUpdated(phoneNumber); // Notify the parent component
      onRequestClose();
    } catch (err) {
      setError("An error occurred while verifying OTP. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onRequestClose}
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Change Phone Number</h2>

        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new phone number"
            />
          </div>

          {isOtpSent && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter OTP"
              />
            </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <div className="flex justify-end">
            {isOtpSent ? (
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
