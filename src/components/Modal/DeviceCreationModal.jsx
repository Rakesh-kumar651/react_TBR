import { Modal, Button, Tabs, Tab, Spinner } from "react-bootstrap";
import NewDeviceForm from "../DeviceManagement/DeviceCreation/NewDeviceForm";
import BulkDeviceUpload from "../DeviceManagement/DeviceCreation/BulkDeviceUpload";

const DeviceCreationModal = ({ show, onClose, onCreate, loading }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Device Creation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center">
            <Spinner />
          </div>
        )}

        <Tabs defaultActiveKey="single" className="mb-3" variant="pills">
          <Tab eventKey="single" title="New device">
            <NewDeviceForm />
          </Tab>

          <Tab eventKey="bulk" title="Bulk creation">
            <BulkDeviceUpload />
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceCreationModal;
