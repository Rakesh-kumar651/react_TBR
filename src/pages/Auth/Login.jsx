import React, { useState } from "react";
import LogoIcon from "../../assets/img/logo/logo_white.svg"
import logo from "../../assets/img/logo/logo.png"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";     // ⬅️ Add this
import "./LoginPage.css";
import InputField from "../../components/Forms/InputField";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();   // ⬅️ Enable navigation

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email & password");
      return;
    }

    // Save login token
    localStorage.setItem("token", "login-success");

    // Redirect to dashboard or home page
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="login-container">
        <Row>
          {/* Left Section */}
          <Col md={7} className="login-page-bg d-flex align-items-center">
            <div className="login-bg-content text-center w-100 d-flex align-items-center justify-content-center flex-column">
              <img src={LogoIcon} alt="logo" className="logo-white" id="logoBg" />

              <h4 className="logo-text-1 mt-4">What's our Why...</h4>
              <h2 className="logo-text-2 mt-3">Humanizing Devices</h2>

              <p className="logo-text-3 mt-4">
                We believe that the future is <span className="highlight">borderless</span>, where <br />
                every <span className="highlight">"thing"</span> collaborates to enrich lives and strengthen <br />
                businesses <span className="highlight">sustainably</span> and <span className="highlight">efficiently</span>...
              </p>
            </div>
          </Col>

          {/* Right Section */}
          <Col
            md={5}
            className="d-flex flex-column justify-content-center align-items-center position-relative"
          >
            {/* Loader */}
            {/* <div className="loader hide position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div> */}

            {/* Login Form */}
            <div className="login-page-form px-4 w-75">
              <Form onSubmit={handleLogin}>
                <img src={logo} alt="logo" className="form-logo" />

                <h2 className="signin-title mt-3">Sign In to Continue</h2>

                {/* Email */}
                <Form.Group className="mb-4">
                  <InputField
                    label={"Email ID"}
                    type="text"
                    name="email"
                    value={email}
                    onChange={(val) => setEmail(val)}
                  />

                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4">
                  <InputField
                    label={"Password"}
                    type="password"
                    name="email"
                    value={password}
                    onChange={(val) => setPassword(val)}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-4 position-relative">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <img
                    src={showPassword ? "/images/password_show.svg" : "/images/password_hide.svg"}
                    alt="eye"
                    className="password-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </Form.Group> */}

                {/* Remember + Forgot */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                    // checked={isChecked}
                    // onChange={() => handleSelect(item)}
                    />
                    <span className="checkmark"></span>
                    <span className="option-text">Remember me</span>
                  </label>
                  <div className="forgot-text">Forgot Password?</div>
                </div>

                <Button type="submit" className="w-100 rounded-pill btn-dark" variant="primary">
                  Sign In
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
