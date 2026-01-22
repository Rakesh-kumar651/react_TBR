import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./select.css";

const ReusableSelect = ({
  options = [],
  mode = "single",
  placeholder = "Select",
  className = "",
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ applied value
  const [selected, setSelected] = useState(mode === "single" ? null : []);

  // ✅ temp value (before apply)
  const [tempSelected, setTempSelected] = useState(
    mode === "single" ? null : []
  );

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = () => {
    setTempSelected(selected); // sync temp with applied
    setOpen(!open);
  };

  const handleTempSelect = (item) => {
    if (mode === "single") {
      setTempSelected(item);
    } else {
      setTempSelected((prev) =>
        prev.includes(item.value)
          ? prev.filter((x) => x !== item.value)
          : [...prev, item.value]
      );
    }
  };

  const applySelection = () => {
    setSelected(tempSelected);
    onChange?.(tempSelected); // ✅ ONLY HERE
    setOpen(false);
  };

  const clearSelection = () => {
    const empty = mode === "single" ? null : [];
    setTempSelected(empty);
    setSelected(empty);
    onChange?.(empty);
  };

  return (
    <div className={`custom-select ${className}`}>
      <div className="select-box" onClick={toggle}>
        <span>
          {mode === "single"
            ? selected?.label || placeholder
            : selected.length
            ? `${selected.length} selected`
            : placeholder}
        </span>
        <span className="arrow">
          <i className="tkb-down-arrow-small"></i>
        </span>
      </div>

      {open && (
        <div className="dropdown-box">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="search-inputs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ul className="option-list">
            {filtered.length === 0 && (
              <li className="no-data">No data found</li>
            )}

            {filtered.map((item) => {
              const isChecked =
                mode === "single"
                  ? tempSelected?.value === item.value
                  : tempSelected.includes(item.value);

              return (
                <li key={item.value} className="option-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleTempSelect(item)}
                    />
                    <span className="checkmark"></span>
                    <span className="option-text">{item.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          {/* BUTTONS */}
          <div className="btn-row d-flex align-items-center gap-2 justify-content-center mt-2">
            {mode === "multiple" && (
              <button
                className="btn btn-sm btn-dark rounded-pill w-50"
                onClick={clearSelection}
              >
                Clear
              </button>
            )}

            <button
              className="btn btn-sm btn-dark rounded-pill w-50"
              onClick={applySelection}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableSelect;
