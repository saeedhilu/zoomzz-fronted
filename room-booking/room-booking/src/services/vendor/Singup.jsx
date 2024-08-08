import instance from "../../utils/Axiox";

const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("+91")) {
    return phoneNumber;
  }
  return `+91${phoneNumber}`;
};

const Signup = async (values) => {
  const formattedPhoneNumber = formatPhoneNumber(values.phone_number);

  try {
    const response = await instance.post("vendor/signup-vendor/", {
      ...values,
      phone_number: formattedPhoneNumber,
    });
    return response.data;
  } catch (error) {
    
    
    if (error.response.data){
        throw error.response.data
    }else{
        console.log('nothign');
        
    }
   
  }
};

export default Signup;
