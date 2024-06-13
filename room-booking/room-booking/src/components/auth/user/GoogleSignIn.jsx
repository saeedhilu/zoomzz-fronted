import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import instance from "../../../utils/Axiox";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const handleSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.credential;
    try {
      console.log("Access Token:", accessToken);
      const response = await instance.post("accounts/google/auth/", {
        access_token: accessToken,
      });
      console.log("Backend response:", response.data);
      // Handle the response from the backend as needed
    } catch (error) {
      console.error("Error sending access token to backend:", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Google Sign-In failed:", error);
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
