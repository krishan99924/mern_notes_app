import React from "react";

const MainScreenCrud = ({ title, children }) => {
  return (
    <>
      <h3>{title}</h3>
      {children}
    </>
  );
};

export default MainScreenCrud;
