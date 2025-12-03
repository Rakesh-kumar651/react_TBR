import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/fonts/style.css'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import DeviceManagementLayout from "./layout/DeviceManagementLayout.jsx";
import UtilitiesLayout from "./layout/UtilitiesLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeviceList from "./pages/Utilities/DeviceList.jsx";
import Devicemanagement from "./pages/DeviceManagement/Devicemanagement.jsx";
import KeyRequestList from "./pages/DeviceManagement/KeyRequestList.jsx";
import DeviceStatus from "./pages/DeviceManagement/DeviceStatus.jsx";
import LoginPage from "./pages/Auth/Login.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";



function App() {
  return (
   <ThemeProvider>
  <BrowserRouter>
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Devicemanagement />} />
        <Route path="/keyrequestList" element={<KeyRequestList />} />
        <Route path="/device-status" element={<DeviceStatus />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <MainLayout1 />
          </ProtectedRoute>
        }
      >
        <Route path="/utilities" element={<DeviceList />} />
      </Route>
      
    </Routes>
  </BrowserRouter>
</ThemeProvider>

  );
}

export default App;
