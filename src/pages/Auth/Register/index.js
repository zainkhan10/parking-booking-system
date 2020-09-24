import React from "react";
import { Col, Row, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import "./style.css";
import { LOGIN } from "../../../constants/routingNames";
import AlertBox from "../../../components/AlertMsg";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../redux/Actions/Creators/Auth";

export default ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const successMsg = useSelector((state) => state.commonReducer.success);

  const onFinish = (values) => {
    values.uuid = uuid();
    values.userType = "normal";
    dispatch(createUser(values));
  };
  //   const addAdmin = () => {
  //     let obj = {
  //       email: "admin@pbs.com",
  //       name: "Admin",
  //       mobile: "0331234567",
  //       password: "admin",
  //       userType: "admin",
  //       username: "admin",
  //       uuid: uuid(),
  //     };
  //     FirebaseDb.child("users").push(obj, (err) => {
  //       if (err) console.log(err);
  //     });
  //   };
  return (
    <Row justify="center" align="middle" className="auth-container">
      <Col xs={22} sm={22} md={10} lg={9}>
        <h4 className="auth-page-heading">Parking Booking System</h4>
        <div className="auth-form-container">
          <div className="auth-form-heading">
            <h2>Create a new account</h2>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
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
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please input your Mobile!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Mobile"
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
                Register
              </Button>
            </Form.Item>
            Or <Link to={LOGIN}>back to Login</Link>
          </Form>
        </div>
        {/* <Button onClick={addAdmin} className="login-form-button">
          Admin
        </Button> */}
      </Col>
      {successMsg && (
        <AlertBox
          title="User Created"
          description="User Successfully Created."
          onConfirm={() => history.push(LOGIN)}
          type="success"
        />
      )}
    </Row>
  );
};
