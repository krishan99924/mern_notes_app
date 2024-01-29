import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container className="">
        <Row className="py-3 d-flex justify-content-center">
          copyright &copy; 2023
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
