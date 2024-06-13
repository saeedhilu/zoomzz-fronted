import instance from "../utils/Axiox";

export const sendOtp = async (phoneNumber) => {
    {console.log('====================================');
    console.log('phone number form ',phoneNumber);
    console.log('====================================');}
  try {
    const response = await instance.post("accounts/generate-ph-otp/", {
      phone_number: phoneNumber,
    });
    console.log("OTP sent successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};
export default sendOtp;