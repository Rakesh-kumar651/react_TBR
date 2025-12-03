
import { Outlet } from "react-router-dom";
import Header from "../components/utilitiescomponent/Header";

export default function MainLayout() {
    return (
        <div className="position-relative" style={{ height: "100vh" }}>

            {/* Header */}
             
        
            {/* Content area */}
            <div className="container-fluid px-0" style={{flexGrow:1}}>

                
                    <Outlet />

                {/* Page Content */}
                
            </div>
        </div>
    );
}
