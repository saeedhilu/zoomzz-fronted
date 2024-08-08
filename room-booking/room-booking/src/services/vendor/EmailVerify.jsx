import instance from "../../utils/Axiox"
const VerifyEmail= async(data)=>{
    
    try {
        const response = await instance.post("/vendor/verify-email-otp/", {
          data
        });
        
        
        console.log("response is :", response);
        return response
      } catch (error) {
        console.log("From verify ", error);
      }
}
export default VerifyEmail;