import React from 'react';
import { VscAccount } from "react-icons/vsc";
import SearchBar from '../layout/SearchBar';

const Header = ({ websiteName, userLogoUrl }) => {
  const bgImage = 'https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <header className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container mx-auto flex  sm:flex-row items-center justify-between py-6 px-4 sm:px-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-white">{websiteName}</h1>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div>
            {userLogoUrl ? (
              <img src={userLogoUrl} alt="User Logo" className="w-10 h-10 rounded-full" />
            ) : (
              <VscAccount className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center" />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 w-full px-4">
        <div className="max-w-4xl mx-auto">
          <SearchBar locations={[{ id: 1, name: 'New York' }, { id: 2, name: 'Los Angeles' }]} />
        </div>
      </div>
    </header>
  );
};

export default Header;
