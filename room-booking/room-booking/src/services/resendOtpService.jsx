import instance from "../utils/Axiox";
export const resendOtp = async (phoneNumber) => {
    //This service file for re-sent otp

  try {
    const response = await instance.post("accounts/resend-otp/", {
      phone_number: phoneNumber,
    });
    console.log("OTP resent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to resend OTP:", error);
    throw error;
  }
};
export default resendOtp;