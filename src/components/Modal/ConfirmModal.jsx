import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import LoadIcon from "./../../assets/img/isometric/load-test.svg"

const ConfirmModal = ({ confirmShow, confirmonHide,onConfirm  }) => {
    return (
        <>
            <Modal show={confirmShow} onHide={confirmonHide} centered backdrop="static" className="import-modal tp-adjusto">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-center flex-column gap-3">
                        <img width={80} src={LoadIcon} alt="Load" />
                        <div className="fs-5 fw-semibold text-center">

                            <p className="mb-0">Are your sure.</p>
                            <p className="mb-0">Do you want to onboard devices?</p>
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer className="pt-0 border-0 justify-content-center align-items-center gap-1">
                    
                        <Button size="sm" variant="outline-dark" className="rounded-pill" onClick={confirmonHide}>
                            No
                        </Button>
                        <Button size="sm" variant="dark" className="rounded-pill" onClick={onConfirm}>
                            Yes
                        </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmModal