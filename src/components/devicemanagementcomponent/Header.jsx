import React from "react";
import { Navbar, Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import searchIcon from "../../assets/img/icons/search-icon.png"
import notificationIcon from "../../assets/img/icons/notification-icon.png"
import settingsIcon from "../../assets/img/icons/background-tasks.svg"
import envelopeIcon from "../../assets/img/icons/envelope.png"
import LogoIcon from "../../assets/img/logo/logo.png"
const Header = () => {
    return (
        <header className="header-content">
            <Navbar expand="md" className="navbar">
                <Container fluid>
                    <Row className="align-items-center w-100">

                        {/* LEFT LOGO */}
                        <Col md={3} xs={6}>
                            <div className="navbar-logo">
                                <a href="/" className="nav-logo-link">
                                    <img className="logo-img" alt="logo" src={LogoIcon} />
                                </a>
                            </div>
                        </Col>

                        {/* SEARCH BOX (HIDDEN ON MOBILE) */}
                        <Col md={6} className="d-none d-md-block">
                            <div className="navbar-menu d-flex align-items-center justify-content-center">
                                <div className="search-container d-flex">
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        className="search-input"
                                    />
                                    <Button className="search-button ms-2">
                                        <img src={searchIcon} alt="search" />
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        {/* ACTION BUTTONS + USER MENU */}
                        <Col md={3} xs={6}>
                            <div className="header-nav-action d-flex justify-content-end align-items-center gap-2">
                                 {/* 🔔 Settings BUTTON */}
                                <Button
                                    variant="link"
                                    className="notifybtn actionbtn notify-actionbtn p-0 d-flex align-items-center"
                                    onClick={() =>
                                        console.log("Show Notifications (notificationModelList)")
                                    }
                                >
                                    <img src={settingsIcon} alt="notification" />
                                </Button> 

                                {/* 🔔 NOTIFICATION BUTTON */}
                                <Button
                                    variant="link"
                                    className="notifybtn actionbtn notify-actionbtn p-0 d-flex align-items-center"
                                    onClick={() =>
                                        console.log("Show Notifications (notificationModelList)")
                                    }
                                >
                                    <img src={notificationIcon} alt="notification" />
                                </Button>

                                {/* 👤 USER DROPDOWN */}
                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        as="div"
                                        className="p-0 d-flex align-items-center userNavbar"
                                    >
                                        <div className="navbar-log d-flex align-items-center">
                                            <div className="log-picture">R</div>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="userDropdown-menu p-3">

                                        {/* USER EMAIL */}
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <div className="user-picture">
                                                <img className="picture" src={envelopeIcon} alt="user" />
                                            </div>
                                            <h6 className="navEmail m-0">rakesh.k@tinkerblox.io</h6>
                                        </div>

                                        <div className="hLine my-2" />

                                        {/* MENU ITEMS */}
                                        <Dropdown.Item href="/Profile" className="userLink">
                                            <div className="d-flex gap-2 align-items-center">
                                                <img className="userLinkImg" src="/images/user.png" alt="" />
                                                <h6 className="userLinkName m-0">My Profile</h6>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item href="/RuleEngine/Alerts" className="userLink">
                                            <div className="d-flex gap-2 align-items-center">
                                                <img className="userLinkImg" src="/images/notification.png" alt="" />
                                                <h6 className="userLinkName m-0">Notification</h6>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item href="/Swagger" className="userLink">
                                            <div className="d-flex gap-2 align-items-center">
                                                <img className="userLinkImg" src={envelopeIcon} alt="" />
                                                <h6 className="userLinkName m-0">Swagger</h6>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item href="/" className="userLink">
                                            <div className="d-flex gap-2 align-items-center">
                                                <img className="userLinkImg" src="/images/help.png" alt="" />
                                                <h6 className="userLinkName m-0">Help</h6>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Divider />

                                        {/* LOGOUT */}
                                        <Dropdown.Item
                                            className="userLink text-danger"
                                            onClick={() => window.logout?.()}
                                        >
                                            <div className="d-flex gap-2 align-items-center">
                                                <img className="userLinkImg" src="/images/logout.png" alt="" />
                                                <h6 className="userLinkName m-0">Log out</h6>
                                            </div>
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
