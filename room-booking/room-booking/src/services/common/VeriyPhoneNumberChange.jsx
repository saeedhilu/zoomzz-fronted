import instance from "../../utils/Axiox";

const VeriyUpdatePhoneNumber = async (phoneNumber, otp) => {

  try {
    const response = await instance.post("accounts/verify-otp/update/", {
      phone_number: phoneNumber,
      otp: otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default VeriyUpdatePhoneNumber;
