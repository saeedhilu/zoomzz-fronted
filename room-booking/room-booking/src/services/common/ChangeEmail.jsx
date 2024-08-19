import instance from "../../utils/Axiox";

const changeEmail = async (email ) => {

  try {
    const response = await instance.post("vendor/change-email/", {
      email: email
    });
    console.log('====================================');
    console.log('response data is :',response);
    console.log('====================================');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default changeEmail;
