import React, { useState, useRef, useEffect } from "react";
import "./SearchExpand.css";

const SearchExpand = ({ onSearch, delay = 300 }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  // Auto focus when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  const handleClear = () => {
    setValue("");
    onSearch("");         // 🔥 reset list
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (!value) setOpen(false);
  };

  return (
    <div className={`search-expand-wrapper ${open ? "open" : ""}`}>
      <input
        ref={inputRef}
        type="text"
        className={`search-expand-input ${open ? "open" : ""}`}
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(value.trim());
            inputRef.current.blur();
          }
        }}
      />

      {/* CLEAR (X) ICON */}
      {value && (
        <span
          className="search-clear-icon"
          onMouseDown={(e) => {
            e.preventDefault(); // prevent blur
            handleClear();
          }}
        >
          ✕
        </span>
      )}

      {/* SEARCH ICON */}
      <span
        className="search-icon"
        onMouseDown={(e) => {
          e.preventDefault(); // prevent blur
          setOpen(true);
        }}
      >
        <i className="tkb-search"></i>
      </span>
    </div>
  );
};

export default SearchExpand;
