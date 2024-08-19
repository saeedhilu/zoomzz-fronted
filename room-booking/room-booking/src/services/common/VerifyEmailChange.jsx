import instance from "../../utils/Axiox";

const verifyEmailChange = async (email, otp) => {
  try {
    const response = await instance.post("vendor/verify-email/", {
      email: email,
      otp: otp,
    });
    console.log("====================================");
    console.log("response data is :", response);
    console.log("====================================");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default verifyEmailChange;
