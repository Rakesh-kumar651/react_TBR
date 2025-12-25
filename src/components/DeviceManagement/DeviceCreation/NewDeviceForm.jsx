import { Row, Col, Form } from "react-bootstrap";
import FirmwareSelect from "./FirmwareSelect";
import TagInput from "../../Forms/TagInput";

const NewDeviceForm = () => {
  return (
    <Form>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control type="text" placeholder="Device name" />
            <label>Device name</label>
          </Form.Floating>
        </Col>

        <Col md={6} className="mb-3">
          <FirmwareSelect />
        </Col>

        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control type="text" placeholder="Serial Number" />
            <label>Serial Number</label>
          </Form.Floating>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control type="text" placeholder="External ID" />
            <label>External ID</label>
          </Form.Floating>
        </Col>

        <Col md={12}>
          <TagInput />
        </Col>
      </Row>
    </Form>
  );
};

export default NewDeviceForm;
