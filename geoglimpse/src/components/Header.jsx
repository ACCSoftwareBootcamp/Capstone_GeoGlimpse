import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        GeoGlimpse
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/news">
            News
          </Nav.Link>
          <Nav.Link as={Link} to="/weather">
            Weather
          </Nav.Link>
          <Nav.Link as={Link} to="/maps">
            Maps
          </Nav.Link>
          <Nav.Link as={Link} to="/plan">
            Plan
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
