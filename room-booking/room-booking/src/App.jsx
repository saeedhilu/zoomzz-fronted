// import React from 'react';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Signin from './pages/Signin';
// import Home from './pages/Home';

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// function App() {
//   return (
//     <div>
//       {/* <GoogleOAuthProvider clientId={clientId}>
//       // <Signin />
//     </GoogleOAuthProvider> */}

//     <Home/>

//     </div>

    
//   );
// }
// // App.jsx
// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Signin from './pages/Signin'
import SearchResults from './components/rooms/SearchResult';
import RoomSearch from './components/layout/SearchBar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/search" element={<RoomSearch />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
