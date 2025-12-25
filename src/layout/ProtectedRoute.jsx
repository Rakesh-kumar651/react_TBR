// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("access_token"); // or use context
    
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
