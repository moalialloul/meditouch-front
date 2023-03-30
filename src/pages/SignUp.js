import React, { useState } from "react";
import signinbg from "../assets/images/signup.png";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Select,
  Row,
  Col,
} from "antd";

import { Link, useNavigate } from "react-router-dom";

import { userController } from "../controllers/userController";
import LayoutWrapper from "../components/Layout";
import { toast } from "react-toastify";

const { Header, Footer, Content } = Layout;

export default function SignUp() {
  const navigate = useNavigate();
  const { Option } = Select;
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
    userRole: "",
    userLanguage: "",
    profilePicture: "",
  });
  function updateUser(key, value) {
    let tempUser = { ...userForm };
    tempUser[key] = value;
    setUserForm(tempUser);
  }
  return (
    <LayoutWrapper style={{ position: "relative" }} withFooter={true}>
      <div
        className="layout-default ant-layout layout-sign-up"
        style={{ marginTop: "100px", padding: "100px" }}
      >
        <Content className="p-0 ">
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }} >
              <img src={signinbg} alt="" />
            </Col>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
              className="signup-wrapper"
            >
              <Card
                className="card-signup header-solid h-full ant-card pt-0"
                title={<h5>Register</h5>}
                bordered="false"
              >
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  className="row-col"
                >
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => updateUser("firstName", e.target.value)}
                      placeholder="FirstName"
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => updateUser("lastName", e.target.value)}
                      placeholder="LastName"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => updateUser("userEmail", e.target.value)}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      onChange={(e) => updateUser("password", e.target.value)}
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="userLanguage"
                    rules={[
                      {
                        required: true,
                        message: "Please choose your language!",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="preselect"
                      style={{ width: "100%" }}
                      onChange={(e) => updateUser("userLanguage", e)}
                    >
                      <Option value="preselect" disabled>
                        Select your language
                      </Option>

                      <Option value="en">English</Option>
                      <Option value="ar">Arabic</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="userType"
                    rules={[
                      { required: true, message: "Please choose your role!" },
                    ]}
                  >
                    <Select
                      defaultValue="preselect"
                      style={{ width: "100%" }}
                      onChange={(e) => updateUser("userRole", e)}
                    >
                      <Option value="preselect" disabled>
                        Select your role
                      </Option>

                      <Option value="PATIENT">Patient</Option>
                      <Option value="HEALTH_PROFESSIONAL">
                        Health Professional
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>
                      I agree the{" "}
                      <a href="#pablo" className="font-bold text-dark">
                        Terms and Conditions
                      </a>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      onClick={() => {
                        if (
                          userForm.userEmail.replace(/\s+/g, "") !== "" &&
                          userForm.password.replace(/\s+/g, "") !== "" &&
                          userForm.firstName.replace(/\s+/g, "") !== "" &&
                          userForm.lastName.replace(/\s+/g, "") !== "" &&
                          userForm.userRole.replace(/\s+/g, "") !== "" &&
                          userForm.userLanguage.replace(/\s+/g, "") !== ""
                        ) {
                          userController
                            .registerUser({
                              body: userForm,
                            })
                            .then((response) => {
                              let data = response.data;
                              if (data.responseCode !== 200) {
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
                              toast.success(data.message, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                              });
                              navigate("/verify", {
                                state: {
                                  userFk: data.userId,
                                },
                              });
                            });
                        }
                      }}
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      SIGN UP
                    </Button>
                  </Form.Item>
                </Form>
                <p className="font-semibold text-muted text-center">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="signin-txt" style={{textDecoration:"underline"}}>
                    Sign In
                  </Link>
                </p>
              </Card>
            </Col>

            <Col
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            ></Col>
          </Row>
        </Content>
      </div>
    </LayoutWrapper>
  );
}
