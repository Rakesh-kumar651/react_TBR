import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import ReusableSelect from '../Forms/Selectbox';

const GetLicenseModal = ({ show, onHide, label, buttonText, onSubmit, inputLabel }) => {
    const [clusterName, setClusterName] = useState("");
    const handleSubmit = () => {
        onSubmit(clusterName);   // return value to parent
        setClusterName("");      // clear input
        onHide();               // close modal
    };

    return (
        <>
            <Modal  size="lg" show={show} onHide={onHide} centered backdrop="static" className="import-modal tp-adjusto">
                <Modal.Header closeButton>
                    <Modal.Title>{"Get License"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3 rounded-5 bg-secondary-subtle">
                        <div>
                            <button className='btn btn-sm btn-dark rounded-pill mb-2'>Device count:  10</button>
                        </div>
                        <Row className='g-2'>
                            <Col lg={6} md={6} sm={6}>
                                <ReusableSelect
                                    mode="multiple"
                                    placeholder="Select cluster"
                                    options={[
                                        { value: "hpc", label: "HPC" },
                                        { value: "rule", label: "Rule Data" },
                                    ]}
                                    onChange={(v) => console.log("Selected:", v)}
                                />
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <ReusableSelect
                                    mode="multiple"
                                    placeholder="Select group"
                                    options={[
                                        { value: "hpc", label: "HPC" },
                                        { value: "rule", label: "Rule Data" },
                                    ]}
                                    onChange={(v) => console.log("Selected:", v)}
                                />
                            </Col>
                        </Row>
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

export default GetLicenseModal