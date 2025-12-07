import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import uploadIcon from "./../../assets/img/isometric/cloud-computing.svg"
// import { CloudArrowUp } from "react-bootstrap-icons";

const ImportDevicesModal =({
  show,
  onHide,

  title = "Modal Title",

  /** Buttons */
  primaryButtonLabel = "Save",
  secondaryButtonLabel = "Cancel",
  extraButtons = [], // [{ id:"1", label:"Test", variant:"primary" }]

  onPrimary,
  onSecondary,
  onExtra,

  /** Dropzone Settings */
  dropZone = false, // true → enable file drop area
})=> {
    const [file, setFile] = useState(null);
  const dropRef = useRef();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    dropRef.current.classList.remove("drop-hover");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("drop-hover");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("drop-hover");
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg" className="import-modal tp-adjusto">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {dropZone && (
          <div className="p-3 rounded-5 bg-secondary-subtle">
            <div
              ref={dropRef}
              className="drop-area d-flex flex-column align-items-center justify-content-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <p className="upload-title">Upload your file</p>
              <img width={55} src={uploadIcon} alt="upload-icon" />
              <p className="drop-text">{file ? file.name : "Drop file here"}</p>

              <input type="file" className="file-input" onChange={handleFileSelect} />
            </div>
          </div>
        )}

        {/* USER CAN SEND CUSTOM CONTENT HERE */}
      </Modal.Body>

      <Modal.Footer className="pt-0 border-0 d-flex justify-content-end gap-2">
        {/* Secondary Button */}
        <Button
          size="sm"
          variant="outline-dark"
          className="rounded-pill"
          onClick={onSecondary || onHide}
        >
          {secondaryButtonLabel}
        </Button>

        {/* Extra Buttons */}
        {extraButtons.map((btn) => (
          <Button
            key={btn.id}
            size="sm"
            variant={btn.variant || "secondary"}
            className="rounded-pill"
            onClick={() => onExtra?.(btn.id)}
          >
            {btn.label}
          </Button>
        ))}

        {/* Primary Button */}
        <Button
          size="sm"
          variant="dark"
          className="rounded-pill"
          onClick={onPrimary}
        >
          {primaryButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportDevicesModal;
