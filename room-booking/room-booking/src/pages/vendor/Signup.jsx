import React, { useState } from "react";
import { vendorSignupConfig } from "../../components/layout/admin/FromConfig";
import Form from "../../components/layout/admin/Form";
import Signup from "../../services/vendor/Singup";
import { set } from "lodash";
import OtpForm from "../../components/layout/admin/OtpForm";
import instance from "../../utils/Axiox";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";




const SignupPage = () => {
  const naviagate = useNavigate()
  const [formErrors, setFormErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [formData,setFormData]  = useState([]);
  const dispatch = useDispatch();
  console.log('FormData is :',formData);
  

  const handleVendorSubmit = async (values) => {
    try {
      const response = await Signup(values);
      
      console.log('response data foerm backend :,',response.data);
      
      setFormData(values)
      setFormErrors({});
      setOtpSent(true);
    } catch (error) {
      setFormErrors(error);
    }
  };
  const verifyClick= async (otp)=>{
    console.log('otp from verify Click function',otp);
    
    try {
        const response = await instance.post('/vendor/verify-email-otp/',
          {
            ...formData,otp
          }
        )  
          
        console.log('response is :',response.data);
        
    } catch (error) {
      console.log('From verify ',error);
      
    }
  
  }

  return (
    <main className="h-screen items-center flex justify-center">
      <section className="flex justify-between rounded-2xl bg-custome_violet w-[80%]">
        <aside className="w-3/4 p-20 h-full relative">
          <div className="relative z-10">
            <img
              src="https://www.google.com/imgres?q=svg%20images%20for%20login%20and%20signup%20page&imgurl=https%3A%2F%2Fcdni.iconscout.com%2Fillustration%2Fpremium%2Fthumb%2Flogin-page-4468581-3783954.png%3Ff%3Dwebp&imgrefurl=https%3A%2F%2Ficonscout.com%2Fillustrations%2Fapp-login&docid=B9_pU4aw7hGHLM&tbnid=CbC5nN_c5BWK5M&vet=12ahUKEwiWlonsyOSHAxUsR2wGHQ9nM7kQM3oECBcQAA..i&w=450&h=450&hcb=2&ved=2ahUKEwiWlonsyOSHAxUsR2wGHQ9nM7kQM3oECBcQAA"
              alt=""
            />
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Our Vendor Signup
            </h1>
            <p className="text-lg mb-6">
              Join our platform and start offering your services to a wide
              audience. Our vendor registration process is simple and
              straightforward. Fill in the form on the right to get started.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Why Join Us?</h2>
            <ul className="list-disc list-inside">
              <li className="text-lg mb-2">Access to a large customer base</li>
              <li className="text-lg mb-2">Easy management of your services</li>
              <li className="text-lg mb-2">
                Regular notifications and updates
              </li>
            </ul>
            <button className="mt-4 bg-green-300 hover:bg-green-500 w-full text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Login
            </button>
          </div>
        </aside>
        {otpSent ? (
          <section className="w-3/4 p-10 bg-white shadow-lg rounded-2xl rounded-l-[60px]">
            <OtpForm onSubmitOtp={verifyClick}  />
          </section>
        ) : (
          <section className="w-3/4 p-10 bg-white shadow-lg rounded-2xl rounded-l-[60px]">
            <Form
              initialValues={vendorSignupConfig.initialValues}
              validationSchema={vendorSignupConfig.validationSchema}
              fields={vendorSignupConfig.fields}
              onSubmit={handleVendorSubmit}
              errors={formErrors} 
            />
          </section>
        )}
      </section>
    </main>
  );
};

export default SignupPage;
