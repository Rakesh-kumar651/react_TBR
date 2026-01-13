import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SortDropdown = ({ onSortChange }) => {
  const options = [
    "Created Date",
    "Firmware Name",
    "Board Name",
    "OS Name"
  ];

  const [selected, setSelected] = useState("Created Date");

  const handleSelect = (value) => {
    setSelected(value);
    onSortChange?.(value); // callback to parent
  };

  return (
    <Dropdown className="filter-sortby">
      <Dropdown.Toggle
     
        className="d-flex align-items-center justify-content-between gap-2 px-3 rounded-pill select-box"
      >
        <span className="text-muted small">Sort by</span>
        <span className="fw-semibold">{selected}</span>

        {/* Arrow icon */}
        <span class="arrow"><i className="tkb-down-arrow-small"></i></span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm rounded-3">
        {options.map((item) => (
          <Dropdown.Item
            key={item}
            active={item === selected}
            onClick={() => handleSelect(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
