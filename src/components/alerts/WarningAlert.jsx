import { Alert } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import "../../assets/styles/alertstyles.css";

const WarningAlert = ({ message }) => {
  return (
    <Alert className="custom-alert alert-warning-custom">
      <ExclamationTriangleFill className="alert-icon" />
      <span>{message}</span>
    </Alert>
  );
};

export default WarningAlert;
