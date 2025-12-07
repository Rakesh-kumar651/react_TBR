import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const DeviceKeyModal = ({ show, onHide }) => {
    return (
        <>  <Modal show={show} onHide={onHide} centered backdrop="static" size="lg" className="import-modal tp-adjusto">
            <Modal.Header closeButton>
                <Modal.Title>Device Keys</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-3 rounded-5 bg-secondary-subtle">
                    <label className="form-label fw-semibold fs-7">Download setup files</label>
                    <div className="input-group rounded-5 bg-white py-1 align-items-center mb-1">
                        <input type="text" className="form-control border-0 bg-transparent" placeholder="(url)/setup.zip" value={"(url)/setup.zip"} />
                        <span className="pe-2"><button class="btn btn-dark btn-sm rounded-pill">Download</button></span>
                    </div>
                    <span className="text-secondary fs-7">(device.json, config.json, cert.pem, key.pem, license key)</span>
                </div>



            </Modal.Body>

        </Modal></>
    )
}

export default DeviceKeyModal