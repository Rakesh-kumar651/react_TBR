import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputField from '../Forms/InputField';

const ClusterModal = ({ show, onHide, label, buttonText, onSubmit, inputLabel }) => {
    const [clusterName, setClusterName] = useState("");
    const handleSubmit = () => {
        onSubmit(clusterName);   // return value to parent
        setClusterName("");      // clear input
        onHide();               // close modal
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="import-modal tp-adjusto">
                <Modal.Header closeButton>
                    <Modal.Title>{label ? label : "Create Cluster"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3 rounded-5 bg-secondary-subtle">
                        <InputField
                            label={inputLabel ? inputLabel : "Cluster name"}
                            type="text"
                            name="clusterName"
                            value={clusterName}
                            onChange={(val) => setClusterName(val)}
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