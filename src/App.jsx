import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import MainLayout1 from "./layout/MainLayout1.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeviceList from "./pages/Utilities/DeviceList.jsx";



function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/utilities" element={<DeviceList />} /> */}
          </Route>

            <Route element={<MainLayout1 />}>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/utilities" element={<DeviceList />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
