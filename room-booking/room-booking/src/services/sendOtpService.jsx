import instance from "../utils/Axiox";

export const sendOtp = async (phoneNumber) => {
  //This service file for sent otp
    
  try {
    const response = await instance.post("accounts/generate-ph-otp/", {
      phone_number: phoneNumber,
    });
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
export default sendOtp; 