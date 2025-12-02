import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import DeviceManagementLayout from "./layout/DeviceManagementLayout.jsx";
import UtilitiesLayout from "./layout/UtilitiesLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeviceList from "./pages/Utilities/DeviceList.jsx";
import Devicemanagement from "./pages/DeviceManagement/Devicemanagement.jsx";



function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<DeviceManagementLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/utilities" element={<DeviceList />} /> */}
          </Route>

            <Route element={<UtilitiesLayout />}>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/utilities" element={<DeviceList />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
