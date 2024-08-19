import instance from "../utils/Axiox";
export const initiatePayment = async (paymentData) => {
  console.log("opaymentikb ", paymentData);
  try {
    const response = await instance.post(
      "accounts/initiate_payment/",
      paymentData
    );
    console.log("payements response is :", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
