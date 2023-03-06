import { EncryptStorage } from "encrypt-storage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import img5 from "../assets/images/1.jfif";
const Navbar = (props) => {
  const encryptStorage1 = new EncryptStorage("secret-key", {
    prefix: "@instance1",
  });
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const isLoggedIn = encryptStorage1.getItem("meditouch_user") !== null;
  useEffect(() => {
    let user = encryptStorage1.getItem("meditouch_user");
    if (user) {
      if (userData.userInfo === null) {
        dispatch({
          type: "SET_USER_INFO",
          userInfo: encryptStorage1.getItem("meditouch_user").userInfo,
        });
      }

      if (user.businessAccountInfo) {
        if (userData.businessAccountInfo === null) {
          dispatch({
            type: "SET_BUSINESS_ACCOUNT_INFO",
            businessAccountInfo:
              encryptStorage1.getItem("meditouch_user").businessAccountInfo,
          });
        }
      }
    }
  }, []);

  return (
    <>
      <header className="header">
        <div className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block bg-light shadow-transition">
          <div className="container">
            <div className="row w-100 align-items-center">
              <div className="col-lg-12">
                <nav className="navbar d-flex justify-content-between navbar-expand-lg">
                  <a
                    className="navbar-brand"
                    href="index.html"
                    style={{ fontWeight: "bold", color: "#4E6EF1" }}
                  >
                    <img src={img5} alt="" />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul class="navbar-nav ml-auto pt-2 pt-lg-0 font-base">
                      <li class="nav-item active">
                        <a class="nav-link" aria-current="page" href="/">
                          Home
                        </a>
                      </li>

                      {isLoggedIn && (
                        <li className="nav-item">
                          <a
                            className="page-scroll nav-link"
                            href="/#/dashboard"
                          >
                            Dashboard
                          </a>
                        </li>
                      )}
                      <li class="nav-item ">
                        <a class="nav-link" href="#findUs">
                          Contact Us{" "}
                        </a>
                      </li>
                    </ul>

                    <a
                      class="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4 px-3 py-2"
                      href="/#/sign-in"
                    >
                      Sign In
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
