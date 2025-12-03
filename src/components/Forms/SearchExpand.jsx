import React, { useState, useRef, useEffect } from "react";
import "./SearchExpand.css"; // CSS below

const SearchExpand = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();

  // Auto focus when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className={`search-expand-wrapper ${open ? "open" : ""}`}>
         <input
        ref={inputRef}
        type="text"
        className={`search-expand-input ${open ? "open" : ""}`}
        placeholder="Search..."
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
      />
      <span
        className="search-icon"
        onClick={() => setOpen(true)}
      >
        <i className="tkb-search"></i>
      </span>

     
    </div>
  );
};

export default SearchExpand;
