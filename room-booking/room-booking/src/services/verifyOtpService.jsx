import instance from "../utils/Axiox";
export const verifyOtp = async (phoneNumber, otp) => {
  // This service file for verifying otp

  try {
    const response = await instance.post("accounts/verify-ph-otp/", {
      otp: otp,
      phone_number: phoneNumber,
    });
    console.log("OTP verification successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to verify OTP: Error is :", error);
    throw error;
  }
};
export default verifyOtp;