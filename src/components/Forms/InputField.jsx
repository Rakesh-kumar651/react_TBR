import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";


const InputField = ({ label, type = "text", value, onChange, name,className,color }) => {
  const [isFocused, setIsFocused] = useState(false);

  const filled = isFocused || (value && value.length > 0);

  return (
    <div className={`form-group ${filled ? "filled active" : ""} `}>
      <div className="input-group ">
        <FloatingLabel controlId={name} label={label} className={`mb-0 custom-floating-label  ${color}`}>
          <Form.Control
            type={type}
            placeholder={label}
            className={className}
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
