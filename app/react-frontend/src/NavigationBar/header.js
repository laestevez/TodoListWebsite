import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Userfront from "@userfront/react";
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';

const Header = () => {
  const isLoggedIn = Userfront.accessToken();

  return (
    <Navbar bg = "nav-color" variant="dark" sticky="top"> 
        <Navbar.Brand href="/dashboard">ListTogether</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/newform">New Form</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
            <Nav.Link href="/gallery">Gallery</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link href = "/login">Login</Nav.Link>
                <Nav.Link href = "/signup">Signup</Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <Nav.Link href = "/profile"><img
                src={Userfront.user.image}
                alt="User profile"
                style={{ display: "flex", width: 50, height: 50, objectFit: "cover", borderRadius: "100%", justifyContent: "center" }}
              /></Nav.Link>
            )}
          </Nav>
          </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
