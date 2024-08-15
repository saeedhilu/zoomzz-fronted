import React from "react";
import instance from "../../utils/Axiox";
const getRating=async ()=>{
    try {
        const response = await instance.get('vendor/vendor/ratings/')

        console.log('====================================');
        console.log('response data is :',response);
        console.log('====================================');
        return response.data
    } catch (error) {
        console.log('====================================');
        console.log('Error :',error);
        console.log('====================================');
    }
}


export default getRating;