import React from "react";
import { Container } from "react-bootstrap";

const MainScreen = ({ title, children }) => {
  return (
    <Container>
      <div className="mainScreen" style={{ minHeight: "80vh" }}>
        <div className="title fs-1 pt-4">{title}</div>
        <hr />
        {children}
      </div>
    </Container>
  );
};

export default MainScreen;
