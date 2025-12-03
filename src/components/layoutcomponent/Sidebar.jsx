import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="app-bar-section">
      <div className="app-bar-container">

        <NavLink
          to="/"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-equalizer"></i>
          </div>
        </NavLink>

        <NavLink
          to="/device-status"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-visualizer-icon"></i>
          </div>
        </NavLink>

        <NavLink
          to="/keyrequestList"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-diagnoser-icon"></i>
          </div>
        </NavLink>

        <NavLink
          to="/utilities"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-mail-icon"></i>
          </div>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-smartphone-icon"></i>
          </div>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-user-icon"></i>
          </div>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => `app-bar ${isActive ? "active" : ""}`}
        >
          <div className="icon" style={{ width: 20 }}>
            <i className="tkb-process"></i>
          </div>
        </NavLink>

      </div>
    </div>
  );
}
