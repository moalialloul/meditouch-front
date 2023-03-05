import React, { useState } from "react";
import signinbg from "../assets/images/signup.png";
import {
  Layout,
  Menu,
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

import { Link } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { userController } from "../controllers/userController";
import LayoutWrapper from "../components/Layout";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const template = (
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
  </svg>
);

const profile = (
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
  </svg>
);
const signup = (
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
  </svg>
);
const signin = (
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
  </svg>
);
export default function SignUp() {
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
      <div className="layout-default ant-layout layout-sign-up" style={{marginTop:"100px",padding:"100px"}} >
        <Content className="p-0 " >
    
             <Row  justify="center">
      
         <Col
             
           
             xs={{ span: 24 }}
             lg={{ span: 12 }}
             md={{ span: 12 }}
           >
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
                    { required: true, message: "Please input your firstname!" },
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
                    { required: true, message: "Please input your lastname!" },
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
                    { required: true, message: "Please choose your language!" },
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
                            console.log(response.data);
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
                <Link to="/sign-in" className="font-bold text-dark">
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
           >
            
           </Col>
         </Row>
        </Content>
      </div>
    </LayoutWrapper>
  );
}
