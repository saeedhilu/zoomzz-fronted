import React, { useState } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";

const otpSchema = Yup.object().shape({
  otp: Yup.string().length(6, "OTP must be 6 digits").required("Required"),
});

const OtpForm = ({ onSubmitOtp }) => {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);

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
        // Handle digit input
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

  // Handle key down events for navigation
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
    console.log("OTP from here:", otp);
    onSubmitOtp(otp);
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={otpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
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
                className="text-center border border-gray-300 rounded-md w-10 h-10"
              />
            ))}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Verify OTP
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default OtpForm;
