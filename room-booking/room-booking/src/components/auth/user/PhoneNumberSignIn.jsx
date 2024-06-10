import React, { useState, useEffect } from "react";
import instance from "../../Axiox";

const PhoneNumberSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !otpSent) {
        handleOtpSending();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [otpSent]);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOtpChange = (event, index) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    if (event.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSending = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await instance.post("accounts/generate-ph-otp/", {
        phone_number: phoneNumber,
      });
      console.log("OTP sent successfully:", response.data);
      setOtp(Array(6).fill(""));
      setOtpSent(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.Error || "Failed to send OTP. Please try again.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await instance.post("accounts/resend-otp/", {
        phone_number: phoneNumber,
      });
      console.log("OTP resent successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.Error || "Failed to resend OTP. Please try again.");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
      console.error("Error resending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    setError("");
    try {
      const otpString = otp.join(""); 
      const response = await instance.post("accounts/verify-ph-otp/", { otp: otpString, phone_number: phoneNumber });
      console.log("OTP verification successful:", response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.Error || "Failed to verify OTP. Please try again.");
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-200 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number:
        </label>
        <input
          type="text"
          placeholder="Enter Phone number"
          className="mt-1 p-2 border rounded-md w-full"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      {otpSent && (
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Enter OTP:
          </label>
          <div className="flex">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                id={`otp-${index}`}
                className="w-12 h-12 p-2 border rounded-md text-center mx-1"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    e.preventDefault();
                    document.getElementById(`otp-${index - 1}`).focus();
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!otpSent ? (
                <button
          onClick={handleOtpSending}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <div>
          <button
            onClick={handleOtpVerification}
            className={`bg-green-500 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
          <button
            onClick={handleResendOtp}
            className={`bg-yellow-500 text-white py-2 px-4 rounded-md ml-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Resending OTP..." : "Resend OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberSignIn;
