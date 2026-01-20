import { Toast } from "react-bootstrap";
import {
  CheckCircleFill,
  XCircleFill,
  ExclamationTriangleFill,
  InfoCircleFill,
  X
} from "react-bootstrap-icons";
import "../../assets/styles/ToastStyles.css";

const icons = {
  success: <CheckCircleFill className="toast-icon success" />,
  error: <XCircleFill className="toast-icon error" />,
  warning: <ExclamationTriangleFill className="toast-icon warning" />,
  info: <InfoCircleFill className="toast-icon info" />
};

const AppToast = ({ show, onClose, message, type = "success" }) => {
  return (
    <Toast
      show={show}
      onClose={onClose}
      delay={3000}
      autohide
      className={`app-toast toast-${type}`}
    >
      <Toast.Body className="toast-body-custom">
        {icons[type]}
        <span className="toast-message">{message}</span>

        <X
          className="toast-close-icon"
          role="button"
          onClick={onClose}
        />
      </Toast.Body>
    </Toast>
  );
};

export default AppToast;
