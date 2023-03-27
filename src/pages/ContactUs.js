import React from "react";
import LayoutWrapper from "../components/Layout";
import "../assets/styles/contactUs.css";
import { useNavigate, Link } from "react-router-dom";
import contactus from "../assets/images/contactus.jfif";
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
  Spin,
} from "antd";
import { Content } from "antd/lib/layout/layout";

const { TextArea } = Input;

const ContactUs = () => {
  const content = (
    <Content className="p-0 ">
    
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
          <img src={contactus} alt="" className="contact-us-img  " style={{ marginTop: "100px"}}/>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
        >
          <div className="text-center signin-txt-title mb-4">Contact Us</div>

          <Form layout="vertical" className="row-col">
            <Form.Item
              className="username"
              label="First Name"
              name="first name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                // onChange={(e) => updateUser("userEmail", e.target.value)}
                placeholder="First Name"
              />
            </Form.Item>

            <Form.Item
              className="username"
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input
                // onChange={(e) => updateUser("userEmail", e.target.value)}
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              className="username"
              label="Subject"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Please input your subject!",
                },
              ]}
            >
              <Input
                // onChange={(e) => updateUser("userEmail", e.target.value)}
                placeholder="Subject"
              />
            </Form.Item>
            <Form.Item
              className="username"
              label="Message"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please input your message!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
  return (
    <LayoutWrapper style={{ position: "relative" }} withFooter={true}>
      <Layout
        className="layout-default layout-signin"
        style={{ marginTop: "60px", padding: "100px" }}
      >
        <div className="contactUs-wrapper">{content}</div>
      </Layout>
    </LayoutWrapper>
  );
};

export default ContactUs;
