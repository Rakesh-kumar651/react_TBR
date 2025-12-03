import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";


const InputField = ({ label, type = "text", value, onChange, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  const filled = isFocused || (value && value.length > 0);

  return (
    <div className={`form-group ${filled ? "filled active" : ""}`}>
      <div className="input-group ">
        <FloatingLabel controlId={name} label={label} className="mb-0">
          <Form.Control
            type={type}
            placeholder={label}
            className=""
            value={value}
            name={name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onChange(e.target.value)}
          />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default InputField;
