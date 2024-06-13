import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Signin from './pages/Signin';
import Home from './pages/Home';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
      <Signin />
    </GoogleOAuthProvider>

    <Home/>

    </div>
    
  );
}

export default App;
