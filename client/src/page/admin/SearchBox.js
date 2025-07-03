// SearchBox.js
import React from "react";

const SearchBox = ({ keyword, onChange }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름 검색"
        className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBox;
