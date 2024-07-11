import instance from "../utils/Axiox";

export const UpdatesendOtp = async (phoneNumber) => {
  //This service file for sent otp
    
  try {
    const response = await instance.post("accounts/phone-number/update/", {
      phone_number: phoneNumber,
    });
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
export default UpdatesendOtp;