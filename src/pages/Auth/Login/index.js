import React, { useEffect } from "react";
import { Col, Row, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.css";
import { REGISTER } from "../../../constants/routingNames";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/Actions/Creators/Users";

export default () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };
  
  return (
    <Row justify="center" align="middle" className="auth-container">
      <Col xs={22} sm={22} md={10} lg={9}>
        <h4 className="auth-page-heading">Parking Booking System</h4>
        <div className="auth-form-container">
          <div className="auth-form-heading">
            <h2>Login to your account</h2>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            Or <Link to={REGISTER}>register now!</Link>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
