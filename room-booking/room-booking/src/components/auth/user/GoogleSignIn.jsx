import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  setUser } from '../../../redux/slices/authSlice';
import instance from '../../../utils/Axiox';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.credential;
    try {
      const response = await instance.post('accounts/google/auth/', {
        access_token: accessToken,
      });
      console.log('response from google signin',response);
      console.log('accesss token i s',response.data.access_token);

      dispatch(setUser({
        accessToken:response.data.access_token ,
        refreshToken:response.data.refresh_token,
        username : response.data.username || null,
      }));  

      

      navigate('/');
    } catch (error) {
      console.error('Error sending access token to backend:', error);
    }
  };

  const handleFailure = (error) => {
    console.error('Google Sign-In failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        text="Sign in with Google"
        width="300px"
        theme="outline"
        shape="pill"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;