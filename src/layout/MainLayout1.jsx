
import { Outlet } from "react-router-dom";
import Header from "../components/layoutcomponent1/Header";

export default function MainLayout() {
    return (
        <div className="position-relative" style={{ height: "100vh" }}>

            {/* Sidebar */}
                <Header />
            {/* <Sidebar /> */}

            {/* Content area */}
            <div className="container-fluid px-0" style={{flexGrow:1}}>

                {/* Header */}

                {/* Page Content */}
                {/* <div className="landing-container">
                    <div className="main_content"> */}
                    <Outlet />

                    {/* </div>
                </div> */}
            </div>
        </div>
    );
}
