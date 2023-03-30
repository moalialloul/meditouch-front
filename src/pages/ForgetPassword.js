import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
 
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  
} from "antd";

import { userController } from "../controllers/userController";
import { useDispatch } from "react-redux";
import { EncryptStorage } from "encrypt-storage";
import LayoutWrapper from "../components/Layout";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function ForgetPassword() {
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
