
import { Outlet } from "react-router-dom";
import Sidebar from "../components/devicemanagementcomponent/Sidebar";
import Header from "../components/devicemanagementcomponent/Header";

export default function MainLayout() {
    return (
        <div className="position-relative" style={{ height: "100vh" }}>

            {/* Sidebar */}
            <Header />
            <Sidebar />

            {/* Content area */}
            <div className="container-fluid px-0" style={{ flexGrow: 1 }}>

                {/* Header */}

                {/* Page Content */}
                <div className="landing-container">
                    <div className="main_content pb-2">
                        <Outlet />

                    </div>
                </div>
            </div>
        </div>
    );
}
