import { useState } from 'react';
import GoogleSignIn from './components/auth/user/GoogleSignIn';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider
import { MainSignin } from './components/auth/user/MainSignin';


const GID =  import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {

console.log(GID);
  return (
    <GoogleOAuthProvider clientId={GID}> 
      <MainSignin />
    </GoogleOAuthProvider>
  );
}

export default App;
