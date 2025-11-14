import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors h-full flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   text-gray-700 dark:text-gray-200 dark:bg-gray-700 transition duration-150 ease-in-out"
      />
    </div>
  );
};

export default SearchBar;