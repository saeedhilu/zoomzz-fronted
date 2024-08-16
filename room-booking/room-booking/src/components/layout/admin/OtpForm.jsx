import React, { useState, useEffect } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import resendOtp from "../../../services/resendOtpService";

const otpSchema = Yup.object().shape({
  otp: Yup.string().length(6, "OTP must be 6 digits").required("Required"),
});

const OtpForm = ({ onSubmitOtp, error, sentTo, apiUrl }) => {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30); // Countdown timer
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false); // State for resend button

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtpArray = [...otpArray];

      if (value === "") {
        newOtpArray[index] = "";
        setOtpArray(newOtpArray);

        if (index > 0) {
          setTimeout(() => {
            document.getElementById(`otp-${index - 1}`).focus();
          }, 0);
        }
      } else {
        newOtpArray[index] = value;
        setOtpArray(newOtpArray);

        if (index < 5) {
          setTimeout(() => {
            document.getElementById(`otp-${index + 1}`).focus();
          }, 0);
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < 5) {
      setTimeout(() => {
        document.getElementById(`otp-${index + 1}`).focus();
      }, 0);
    } else if (e.key === "ArrowLeft" && index > 0) {
      setTimeout(() => {
        document.getElementById(`otp-${index - 1}`).focus();
      }, 0);
    }
  };

  const handleSubmit = () => {
    const otp = otpArray.join("");
    onSubmitOtp(otp);
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true); // Disable button while resending
      const response = await resendOtp('vendor', sentTo); // Call the resendOtp service
      console.log(response);
      setTimeLeft(30); // Reset timer
      setIsExpired(false); // Reactivate the OTP input
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsResending(false); // Re-enable button after request
    }
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={otpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="flex justify-center flex-col items-center space-y-4">
          <h1 className="text-xl font-bold text-center text-gray-800">
            Enter the OTP sent to your registered email{" "}
            <span className="text-red-500">{sentTo}</span>.
          </h1>
          <p className="text-sm text-gray-600 text-center flex">
            OTP is valid for the next{" "}
            <h1 className="pl-3 pr-2 font-bold">{timeLeft}</h1> seconds
          </p>
          <div className="flex space-x-2 justify-center mb-4">
            {otpArray.map((_, index) => (
              <Field
                key={index}
                id={`otp-${index}`}
                name={`otp-${index}`}
                type="text"
                maxLength="1"
                value={otpArray[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="text-center border border-gray-300 rounded-md w-10 h-10 text-lg"
                disabled={isExpired}
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || isExpired}
            className={`mt-4 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${
              isExpired
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Verify OTP
          </button>
          {isExpired && (
            <p className="text-red-500 text-sm text-center mt-4">
              OTP has expired. Please request a new one.
            </p>
          )}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className={`mt-4 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${
              isResending
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            }`}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default OtpForm;
