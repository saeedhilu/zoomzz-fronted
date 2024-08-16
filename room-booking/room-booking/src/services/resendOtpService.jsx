import instance from "../utils/Axiox";
export const resendOtp = async (url,data) => {
    //This service file for re-sent otp

  try {
    const response = await instance.post(`${url}/resend-otp/`, {
      data: data,
    });
    console.log("OTP resent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to resend OTP:", error);
    throw error;
  }
};
export default resendOtp;