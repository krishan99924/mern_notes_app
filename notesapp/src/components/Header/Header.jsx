import React, { useState } from "react";
import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logout } from "../../Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.userReducer);
  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        {!userInfo && 
        <Navbar.Brand className="text-white">
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Notes Home
          </Link>
          {/* Notes app */}
        </Navbar.Brand>
}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-auto"
            aria-label="Search"
            // onChange={(e) => {
            //   getValofIBox(e);
            // }}
          />
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              {userInfo && <Link to="/mynotes">my notes</Link>}
            </Nav.Link>
            <NavDropdown
              title={userInfo ? userInfo?.user.name : "visitors"}
              id="navbarScrollingDropdown"
              className="text-white fs-4"
            >
              <NavDropdown.Item href="#action3">profile</NavDropdown.Item>
              {userInfo && (
                <NavDropdown.Item href="#action4">
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
