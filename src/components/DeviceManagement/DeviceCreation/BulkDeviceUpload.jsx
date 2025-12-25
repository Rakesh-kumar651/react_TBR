import { Form } from "react-bootstrap";

const BulkDeviceUpload = () => {
  return (
    <div className="text-center p-4 border rounded">
      <h6>Upload CSV for bulk device creation</h6>

      <Form.Group className="mt-3">
        <Form.Control type="file" accept=".csv" />
      </Form.Group>

      <a
        href="/data/sample.csv"
        download
        className="d-inline-block mt-3 text-decoration-none"
      >
        Download CSV sample
      </a>
    </div>
  );
};

export default BulkDeviceUpload;
