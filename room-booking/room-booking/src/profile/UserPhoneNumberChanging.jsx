import React, { useState } from "react";
import Modal from "react-modal";
import UpdatesendOtp from "../services/common/PhoneNumberChanging";
import VeriyUpdatePhoneNumber from "../services/common/VeriyPhoneNumberChange";

const PhoneNumberModal = ({ isOpen, onRequestClose, onPhoneNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    setPhoneNumberError("");
    onPhoneNumberChange(newPhoneNumber);
  };

  const handleOtpChange = (event, index) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);

    if (event.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await UpdatesendOtp(phoneNumber);
      if (response) {
        setOtpSent(true);
        setError("");
      }
    } catch (error) {
      if (error.response && error.response.data.phone_number) {
        setPhoneNumberError(error.response.data.phone_number[0]);
      } else {
        setOtpSent(false);
        setError("Error sending OTP");
        console.error("Error sending OTP", error);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await VeriyUpdatePhoneNumber(phoneNumber, otp.join(""));
      if (response) {
        onPhoneNumberChange(phoneNumber);
        onRequestClose();
        setError("");
      }
    } catch (error) {
      setError("Error verifying OTP");
      console.error("Error verifying OTP", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white w-full sm:w-1/2 md:w-1/3 text-center p-8 rounded-lg shadow-2xl">
        {!otpSent ? (
          <div>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter your Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
            {phoneNumberError && (
              <p className="mt-1 text-red-500 text-sm">{phoneNumberError}</p>
            )}
            <button
              onClick={handleSendOtp}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <p className="text-left text-gray-600 mb-4">Please enter the OTP sent to your phone number:</p>
            <div className="flex justify-center space-x-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  name={`otp-${index}`}
                  value={value}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="w-12 sm:w-16 h-12 sm:h-16 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
          </div>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </Modal>
  );
};

export default PhoneNumberModal;
