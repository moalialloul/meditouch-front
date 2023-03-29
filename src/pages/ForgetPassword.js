import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Card,
} from "antd";
import signinbg from "../assets/images/signIn.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { userController } from "../controllers/userController";
import { useDispatch } from "react-redux";
import { businessAccountController } from "../controllers/businessAccountController";
import { EncryptStorage } from "encrypt-storage";
import Navbar from "../components/Navbar";
import LayoutWrapper from "../components/Layout";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const template = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const profile = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const signup = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const signin = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      className="fill-muted"
      d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
  </svg>,
];
export default function ForgetPassword() {
  const { state } = useLocation();
  const encryptStorage1 = new EncryptStorage("secret-key", {
    prefix: "@instance1",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    userEmail: "",
    token: "",
    password: "",
    userFk: "",
  });
  const [index, setIndex] = useState(0);
  function updateUser(key, value) {
    let tempUser = { ...userForm };
    tempUser[key] = value;
    setUserForm(tempUser);
  }
  useEffect(() => {
    let user = encryptStorage1.getItem("meditouch_user");
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  function generateToken() {
    userController
      .generateToken({
        body: {
          userEmail: userForm.userEmail,
        },
        tokenType: "PASSWORD",
      })
      .then((response) => {
        let data = response.data;
        if (data.responseCode === -1) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
          return;
        } else {
          if (index === 0) {
            setIndex(1);
            updateUser("userFk", data.userId);
          }
        }
      });
  }
  function checkToken() {
    if (userForm.token.replace(/\s+/g, "") !== "") {
      userController
        .checkToken({
          body: {
            userFk: userForm.userFk,
            tokenValue: userForm.token,
          },
          tokenType: "PASSWORD",
        })
        .then((response) => {
          let data = response.data;
          if (data.responseCode === -1) {
            toast.error(data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            });
            return;
          }
          setIndex(2);
        });
    }
  }
  function forgetPassword() {
    if (userForm.password.replace(/\s+/g, "") !== "") {
      userController
        .forgetPassword({
          body: {
            password: userForm.password,
            userId: userForm.userFk,
          },
        })
        .then((response) => {
          let data = response.data;
          toast.success(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
          navigate("/sign-in");
        });
    }
  }
  return (
    <LayoutWrapper style={{ position: "relative" }} withFooter={true}>
      <Layout
        className="layout-default layout-signin"
        style={{ marginTop: "100px", padding: "100px" }}
      >
        <Content className="signin">
          <Row justify="center">
            {index === 0 ? (
              <Col
                xs={{ span: 18 }}
                lg={{ span: 18 }}
                md={{ span: 18 }}
                sm={{ span: 18 }}
                className="signin-wrapper"
              >
                <Title className="text-center signin-txt">
                  Enter your email
                </Title>

                <Form layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => updateUser("userEmail", e.target.value)}
                      placeholder="Please input your email"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        generateToken();
                      }}
                      style={{ width: "100%" }}
                    >
                      Verify
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            ) : index === 1 ? (
              <Col
                xs={{ span: 18 }}
                lg={{ span: 18 }}
                md={{ span: 18 }}
                sm={{ span: 18 }}
                className="signin-wrapper"
              >
                <Title className="text-center signin-txt">
                  Enter your token
                </Title>

                <Form layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    name="token"
                    rules={[
                      {
                        required: true,

                        message: "Please input your token!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => updateUser("token", e.target.value)}
                      placeholder="Please input your token"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        checkToken();
                      }}
                      style={{ width: "100%" }}
                    >
                      Verify
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            ) : (
              <Col
                xs={{ span: 23 }}
                lg={{ span: 23 }}
                md={{ span: 23 }}
                sm={{ span: 23 }}
                className="signin-wrapper"
              >
                <Title className="text-center signin-txt">
                  Enter your new password
                </Title>

                <Form layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => updateUser("password", e.target.value)}
                      type="password"
                      placeholder="Please input your password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        forgetPassword();
                      }}
                      style={{ width: "100%" }}
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            )}
          </Row>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
}
