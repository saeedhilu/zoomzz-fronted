import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import GoogleSignIn from "./GoogleSignIn";

// Services files
import sendOtp from "../../../services/sendOtpService";
import resendOtp from "../../../services/resendOtpService";
import verifyOtp from "../../../services/verifyOtpService";




const PhoneNumberSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpSending = async () => {
    if (!phoneNumber) {
      setError("Phone number cannot be empty.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await sendOtp(phoneNumber);
      setOtp(Array(6).fill(""));
      setOtpSent(true);
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await resendOtp(phoneNumber);
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    setError("");
    try {
      await verifyOtp(phoneNumber, otp.join(""));
      alert('success');
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-center text-2xl font-semibold mb-4">Sign in</h2>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <div className="flex items-center mt-1">
            <div className="flex items-center border border-gray-300 rounded-l-md px-3 w-36 h-10">
              <span className="text-gray-500">IND (+91)</span>
            </div>
            <div className="h-full w-px bg-gray-300"></div>
            <input
              type="text"
              placeholder="Enter Your Number"
              className="p-2 border rounded-r-md w-full"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        {otpSent && (
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP:
            </label>
            <div className="flex justify-center">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  className="w-10 h-10 p-2 border rounded-md text-center mx-1"
                  maxLength="1"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!otpSent ? (
          <button
            onClick={handleOtpSending}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md flex justify-center items-center mt-2  hover:bg-slate-600"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Continue"}
          </button>
        ) : (
          <div>
            <button
              onClick={handleOtpVerification}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md flex justify-center items-center mt-2  hover:bg-slate-600"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </button>
            <button
              onClick={handleResendOtp}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md mt-2 flex justify-center items-center  hover:bg-slate-600"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Resend OTP"}
            </button>
          </div>
        )}
        <div className="my-4">
          <div className="flex items-center justify-center">
            <span className="h-px w-12 bg-gray-300"></span>
            <span className="px-3 text-gray-500">Or Continue With</span>
            <span className="h-px w-12 bg-gray-300"></span>
          </div>
          <button className="w-full text-black py-2 px-4 flex justify-center items-center mt-2">
            <FaGoogle className="mr-2" /> <GoogleSignIn/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberSignIn;
