import React, { useState } from "react";
import LogoIcon from "../../assets/img/logo/logo_white.svg"
import logo from "../../assets/img/logo/logo.png"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";     // ⬅️ Add this
import "./LoginPage.css";
import InputField from "../../components/Forms/InputField";
import { loginApi } from "../../api/auth/loginApi";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

const loginMutation = useMutation({
  mutationFn: loginApi,
  onSuccess: (data) => {
    const expiry = Date.now() + data.expires_in * 1000;

    // ✅ Store ONLY via Redux
    dispatch(
      setCredentials({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenExpiry: expiry,
      })
    );

    navigate("/opas");
  },
  onError: () => {
    alert("Invalid email or password");
  },
});

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both fields");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="login-container">
        <Row>
          <Col md={7} className="login-page-bg d-flex align-items-center">
            <div className="login-bg-content text-center w-100 d-flex align-items-center justify-content-center flex-column">
              <img src={LogoIcon} alt="logo" className="logo-white" />
              <h4 className="logo-text-1 mt-4">What's our Why...</h4>
              <h2 className="logo-text-2 mt-3">Humanizing Devices</h2>
              <p className="logo-text-3 mt-4">
                We believe the future is <span className="highlight">borderless</span>. Every
                <span className="highlight">"thing"</span> collaborates to enrich lives and
                strengthen businesses <span className="highlight">sustainably</span>.
              </p>
            </div>
          </Col>

          <Col md={5} className="d-flex flex-column justify-content-center align-items-center">
            <div className="login-page-form px-4 w-75">
              <Form onSubmit={handleLogin}>
                <img src={logo} alt="logo" className="form-logo" />
                <h2 className="signin-title mt-3">Sign In to Continue</h2>

                <Form.Group className="mb-4">
                  <InputField
                    label="Email ID"
                    type="text"
                    value={email}
                    onChange={(val) => setEmail(val)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(val) => setPassword(val)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-pill btn-dark"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing In..." : "Sign In"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


