import React from 'react';

const ThemeSelection = ({ theme, handleThemeChange }) => {
  return (
    <article className="bg-white shadow-md rounded-lg p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Theme Selection</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => handleThemeChange('light')}
          className={`py-2 px-4 rounded-md ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Light
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={`py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Dark
        </button>
      </div>
    </article>
  );
};

export default ThemeSelection;
