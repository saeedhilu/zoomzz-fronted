import instance from "../../utils/Axiox"




const Signup=async ()=>{
    try {
        const response = await instance.data('vendor/signup-vendor/')
    } catch (error) {
        console.log('====================================');
        console.log('error from Vendor Signup ',error);
        console.log('====================================');
    }
}

export default Signup;