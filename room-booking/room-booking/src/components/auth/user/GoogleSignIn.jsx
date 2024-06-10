import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import instance from '../../Axiox';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const handleSuccess = (response) => {
    const accessToken = response.credential;
    sendAccessTokenToBackend(accessToken);
  };

  const handleFailure = (error) => {
    console.error('Google Sign-In failed:', error);
  };

  const sendAccessTokenToBackend = async (accessToken) => {
    try {
      {console.log('====================================');
      console.log(accessToken);
      console.log('====================================');}
      const response = await instance.post('accounts/google/auth/', { access_token: accessToken });
      console.log('Backend response:', response.data);
      // Handle the response from the backend as needed
    } catch (error) {
      console.error('Error sending access token to backend:', error); 
    }
};


  return (
    <div>
     <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default GoogleSignIn;
