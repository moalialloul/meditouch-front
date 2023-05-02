import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import AuthenticationWrapper from "./AuthenticationWrapper";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutWrapper = ({ ...props }) => {
  const [t, i18n] = useTranslation();
  let { pathname } = useLocation();
  useEffect(() => {
    document.body.scroll(0, 0);
  }, [pathname]);
  return (
    <AuthenticationWrapper>
      <div dir={i18n.language === "en" ? "LTR" : "RTL"}>
        <Navbar />
        <div className="layout-children">{props.children}</div>
        <div className="footer m-0">{props.withFooter && <Footer />}</div>
      </div>
    </AuthenticationWrapper>
  );
};

export default LayoutWrapper;
