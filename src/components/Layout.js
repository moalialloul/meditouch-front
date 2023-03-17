import React from "react";
import AuthenticationWrapper from "./AuthenticationWrapper";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutWrapper = ({ ...props }) => {
  
  return (
    <AuthenticationWrapper>
      <Navbar />
      <div
        className="layout-children"
      >
        {props.children}
      </div>
      <div className="footer m-0">{props.withFooter && <Footer />}</div>
    </AuthenticationWrapper>
  );
};

export default LayoutWrapper;
