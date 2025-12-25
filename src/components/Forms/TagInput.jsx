import { useState } from "react";
import { Badge, Form } from "react-bootstrap";

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      setTags([...tags, value.trim()]);
      setValue("");
    }
  };

  return (
    <>
      <h6>Add your tags (Optional)</h6>

      <div className="mb-2">
        {tags.map((tag, i) => (
          <Badge bg="secondary" className="me-2" key={i}>
            {tag}
          </Badge>
        ))}
      </div>

      <Form.Control
        placeholder="Enter tag and press Enter"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default TagInput;
