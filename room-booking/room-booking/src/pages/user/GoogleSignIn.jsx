import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  setUser } from '../../redux/slices/authSlice';
import instance from '../../utils/Axiox';

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
      console.log('response from google signin',response.data.user);
     const {email,username,access_token,first_name,is_vendor,last_name,phone_number,refresh_token,image} = response.data.user

      dispatch(
        setUser({
          username: username || '', 
          firstName: first_name || '', 
          lastName: last_name || '',
          email: email || '',
          phoneNumber: phone_number, 
          accessToken: access_token,
          refreshToken: refresh_token, 
          isVendor: is_vendor || false,
          profileImage: image || '', 
        })
      );

      // navigate('/');
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