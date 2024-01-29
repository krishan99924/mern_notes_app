import React, { useEffect, useLayoutEffect } from "react";
import "./LandingPage.css";
import { Container, NavLink, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { loading, userInfo } = useSelector((state) => state.userReducer);
  const history = useNavigate();
  useEffect(() => {
    if (userInfo) {
      history("/mynotes");
    }
  }, [userInfo, history]);
  return (
    <>
      <div className="main">
        <Container>
          <Row className="justify-content-center">
            <div
              className="innerWrapper text-center"
              style={{ maxWidth: "630px", width: "100%" }}
            >
              <h1
                className="HeaderTitle"
                style={{ fontSize: "80px", padding: "0 20px" }}
              >
                Welcome To The Notes App
              </h1>
              <p style={{ fontSize: "30px" }} className="HeaderSubTitle">
                one safe place for all your notes
              </p>
              <div className="d-flex justify-content-evenly mt-3">
                <Link to="/signup">
                  <div className="btn btn-primary mx-2 px-3 py-2 fs-5">
                    Signup
                  </div>
                </Link>
                <Link to="/login">
                  <div className="btn btn-danger px-3 py-2 fs-5">Login</div>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LandingPage;
