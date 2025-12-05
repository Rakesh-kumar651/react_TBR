import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import "./Tabs.css";

const Tabs = ({ tabs }) => {
    const [active, setActive] = useState(tabs[0].id);

    return (
        <div >
            {/* TAB BUTTONS */}
            <div className="d-flex align-items-center justify-content-center flex-wrap tab-card">
                <div className="custom-tabs">
                    {tabs.map((t) => (
                        <ToggleButton
                            key={t.id}
                            type="radio"
                            variant="link"
                            name="tabs"
                            className={`tab-btn ${active === t.id ? "active" : ""}`}
                            onClick={() => setActive(t.id)}
                        >
                            {t.label}
                        </ToggleButton>
                    ))}
                </div>
            </div>


            {/* TAB CONTENT */}
            <div className="layout-one-landing-container">
                <div className="main_content pb-2">
                    {tabs.find((t) => t.id === active)?.content}

                </div>
            </div>

        </div>
    );
};

export default Tabs;
