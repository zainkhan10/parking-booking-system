import React, { useState } from "react";
import { Col, Row, Form, Input, Button, Spin, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { LOGIN } from "../../../constants/routingNames";
import AlertBox from "../../../components/AlertMsg";
import FirebaseDb from "../../../firebase";
import "./style.css";

export default ({ history }) => {
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [loader, setLoader] = useState(false);

  const onCreateUser = (values) => {
    const { name, email, mobile, password } = values;
    setLoader(true);
    let path = FirebaseDb.database().ref().child("users");
    FirebaseDb.auth()
      .createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then((user) => {
        path
          .child(`${user.user.uid}`)
          .set({
            info: {
              fullName: name,
              email: email.toLowerCase(),
              mobile,
              userType: "normal",
              uid: user.user.uid,
            },
            selected: {
              slotBooked: "",
            },
          })
          .then((res) => {
            setLoader(false);
            setSuccessMsg(true);
          })
          .catch((err) => {
            setLoader(false);
            alert(err);
          });
      })
      .catch((error) => {
        setLoader(false);
        setErrMsg(error.message);
      });
  };

  return (
    <>
      <Row justify="center" align="middle" className="auth-container">
        <Col xs={22} sm={22} md={10} lg={9}>
          <h4 className="auth-page-heading">Parking Booking System</h4>
          <div className="auth-form-container">
            <Spin spinning={loader}>
              <div className="auth-form-heading">
                <h2>Create a new account</h2>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onCreateUser}
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
              {!_.isEmpty(errMsg) && (
                <Alert
                  message={errMsg}
                  type="error"
                  showIcon
                  className="mt-10"
                />
              )}
            </Spin>
          </div>
        </Col>
      </Row>
      {successMsg && (
        <AlertBox
          title="User Created"
          description="User Successfully Created."
          onConfirm={() => history.push(LOGIN)}
          type="success"
        />
      )}
    </>
  );
};
