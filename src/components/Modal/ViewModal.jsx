import React from 'react'
import { Modal } from 'react-bootstrap'

const ViewModal = ({ show, onHide }) => {
    return (
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="import-modal tp-adjusto">
                <Modal.Header closeButton>
                    <Modal.Title>View Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3 rounded-5 bg-secondary-subtle">
                        <div className="input-group rounded-5 bg-white py-1 align-items-center mb-1">
                            <input type="text" className="form-control border-0 bg-transparent" placeholder="https://dev.tinkerblox.io/deviceManagement/Details?deviceId=caeb4968-..." value={"https://dev.tinkerblox.io/deviceManagement/Details?deviceId=caeb4968-..."} />
                            <span className="pe-2"><button class="btn btn-dark btn-sm rounded-circle px-2"><i className='tkb-files-copy
'></i></button></span>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ViewModal