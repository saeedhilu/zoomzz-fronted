import instance from "../../utils/Axiox";

export const UpdatesendOtp = async (phoneNumber) => {
  //This service file for sent otp
    
  try {
    const response = await instance.post("accounts/phone-number/update/", {
      phone_number: phoneNumber,
    });
    console.log('====================================');
    console.log('respobnse is L',response);
    console.log('====================================');
    
    return response.data;
  } catch (error) {
    console.log('====================================');
    console.log('respnse is : ',error);
    console.log('====================================');
    throw error;
  }
};
export default UpdatesendOtp;