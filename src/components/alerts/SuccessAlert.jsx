import { Alert } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import "../../assets/styles/alertstyles.css";

const SuccessAlert = ({ message }) => {
  return (
    <Alert className="custom-alert alert-success-custom">
      <CheckCircleFill className="alert-icon" />
      <span>{message}</span>
    </Alert>
  );
};

export default SuccessAlert;
