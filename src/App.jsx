import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeviceList from "./pages/Utilities/DeviceList.jsx";
import Devicemanagement from "./pages/DeviceManagement/Devicemanagement.jsx";



function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Devicemanagement />} />
            <Route path="/utilities" element={<DeviceList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
