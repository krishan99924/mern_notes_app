import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Spinner = () => {
  return (
    <div
      style={{
        width: "100% !important",
        height: "100% !important",
        backgroundColor: "grey",
        opacity: "0.7",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Spinner;
