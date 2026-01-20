import React, { useState } from 'react'
import { Button, Modal, Form, ToastContainer } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputField from '../Forms/InputField';
import { useCreateDevice } from "../../hooks/opas/newDevice/useCreateDevice";
import { useSelector } from "react-redux";
import { AppToast } from "../../components/toast";


const ClusterModal = ({ show, onHide, label, inputLabel, buttonText, keyName }) => {
  const [Name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });
  const { mutate, isLoading, isSuccess, isError, error } = useCreateDevice(keyName);

  const handleSubmit = () => {
    const payload =
      keyName === "clusterName"
        ? { clusterName: Name, token }
        : { groupName: Name, token };

    if (!Name.trim()) {
      setErrorMessage(true);
      return;
    }

    mutate(
      payload,
      {
        // ✅ condition 2: close modal ONLY on success
        onSuccess: () => {
          onHide();
          setName("");
          setErrorMessage(false);

          setToast({
            show: true,
            message:
              keyName === "clusterName"
                ? "Cluster created successfully"
                : "Group created successfully",
            type: "success"
          });
        },
        onError: (data) => {
          onHide();
          setName("");
          setErrorMessage(false);
          setToast({
            show: true,
            message: data.response?.data[0] || data.response.data.message || "An error occurred",
            type: "error"
          });
        }
      }
    );   // return value to parent
    // clear input

  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <AppToast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </ToastContainer>

      <Modal show={show} onHide={onHide} centered backdrop="static" className="import-modal tp-adjusto">
        <Modal.Header closeButton>
          <Modal.Title>{label ? label : "Create Cluster"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3 rounded-5 bg-secondary-subtle">
            <InputField
              label={inputLabel || "Cluster name"}
              type="text"
              name={keyName || "clusterName"}
              value={Name}
              onChange={(val) => {
                setName(val);

                // ✅ live validation
                if (!val.trim()) {
                  setErrorMessage(true);
                } else {
                  setErrorMessage(false);
                }
              }}
              className={errorMessage ? "validation-error" : ""}
              color={errorMessage ? "label-error" : ""}
            />

          </div>
        </Modal.Body>
        <Modal.Footer className="pt-0 border-0">
          <div className="d-flex justify-content-end gap-2">

            <Button size="sm" variant="dark" className="rounded-pill" onClick={handleSubmit}>
              {buttonText ? buttonText : "Create"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal >
    </>
  )
}

export default ClusterModal