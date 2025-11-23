// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/theme.css";
import "../assets/styles/global.css";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("default");

    // Apply theme to body whenever it changes
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const changeTheme = (selectedTheme) => {
        setTheme(selectedTheme);
        // No need to set attribute here — useEffect will handle it
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};