import { Alert } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import "../../assets/styles/alertstyles.css";

const ErrorAlert = ({ message }) => {
  return (
    <Alert className="custom-alert alert-error-custom">
      <XCircleFill className="alert-icon" />
      <span>{message}</span>
    </Alert>
  );
};

export default ErrorAlert;
