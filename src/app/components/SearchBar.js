"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Trigger search whenever the input changes
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch(""); // Reset search
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search recipes..."
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
