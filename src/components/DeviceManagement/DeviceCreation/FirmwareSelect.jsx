import { Form } from "react-bootstrap";

const FirmwareSelect = () => {
  return (
    <Form.Group>
      <Form.Label>Firmware</Form.Label>
      <Form.Select>
        <option value="">Select firmware</option>
        <option value="asd">asd</option>
        <option value="demo">Demo</option>
        <option value="abc">ABC</option>
        <option value="tbx">Tbx_Test_Firmware</option>
      </Form.Select>
    </Form.Group>
  );
};

export default FirmwareSelect;
