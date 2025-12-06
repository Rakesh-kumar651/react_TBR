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
import ConfiguratorList from "./pages/Utilities/ConfiguratorList.jsx";



function App() {
  return (
   <ThemeProvider>
  <BrowserRouter>
    <Routes>

      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DeviceManagementLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/devicemanagement" element={<Devicemanagement />} />
        <Route path="/keyrequestList" element={<KeyRequestList />} />
        <Route path="/devicestatus" element={<DeviceStatus />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <UtilitiesLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/opas" element={<DeviceList />} />
        <Route path="/devicelist" element={<ConfiguratorList />} />
      </Route>
      
    </Routes>
  </BrowserRouter>
</ThemeProvider>

  );
}

export default App;
