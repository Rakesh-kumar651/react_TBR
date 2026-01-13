import { Toast } from "react-bootstrap";
import {
  CheckCircleFill,
  XCircleFill,
  ExclamationTriangleFill
} from "react-bootstrap-icons";
import "../../assets/styles/ToastStyles.css";

const icons = {
  // success: <CheckCircleFill className="toast-icon toast-icon-success" />,
  // error: <XCircleFill className="toast-icon toast-icon-error" />,
  // warning: <ExclamationTriangleFill className="toast-icon toast-icon-warning" />,
  // info: <ExclamationTriangleFill className="toast-icon toast-icon-info" />
  success: <CheckCircleFill className="toast-icon" />,
  error: <XCircleFill className="toast-icon " />,
  warning: <ExclamationTriangleFill className="toast-icon" />,
  info: <ExclamationTriangleFill className="toast-icon" />
};


const AppToast = ({ show, onClose, message, type = "success" }) => {
  return (
    <Toast
      show={show}
      delay={3000}
      autohide
      onClose={onClose}
      className="app-toast"
    >
      <Toast.Body className="toast-body-custom">
        {icons[type]}
        <span>{message}</span>
      </Toast.Body>
    </Toast>
  );
};

export default AppToast;
