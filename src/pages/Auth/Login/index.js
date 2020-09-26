import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import "./style.css";
import { REGISTER, USER_SLOTS } from "../../../constants/routingNames";
import { verifyUser } from "../../../redux/Actions/Creators/Auth";
import { getFromLocal } from "../../../utils/Cache";

export default ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const userCheck = useSelector((state) => state.authReducer.err);

  useEffect(() => {
    const userFromStorage = getFromLocal("userInformation");
    if (!_.isEmpty(userFromStorage)) {
      if (userFromStorage.userType === "normal") {
        dispatch(verifyUser(userFromStorage.username, userFromStorage.password));
        history.push(`${USER_SLOTS}`);
      }
    }
  }, [user]);

  const onFinish = (values) => {
    const { username, password } = values;
    dispatch(verifyUser(username, password));
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
          {!_.isEmpty(userCheck) && (
            <Alert
              message="Incorrect Username / Password"
              type="error"
              showIcon
              className="mt-10"
            />
          )}
        </div>
      </Col>
    </Row>
  );
};
