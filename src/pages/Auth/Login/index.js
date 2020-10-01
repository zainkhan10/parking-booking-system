import React, { useEffect, useState } from "react";
import { Col, Row, Form, Input, Button, Alert, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import "./style.css";
import {
  ADMIN_USERS,
  REGISTER,
  USER_BOOK_PARKING,
} from "../../../constants/routingNames";
import { getFromLocal, saveToLocal } from "../../../utils/Cache";
import FirebaseDb from "../../../firebase";

export default ({ history }) => {
  const [errMsg, setErrMsg] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const userFromStorage = getFromLocal("userInformation");
    if (!_.isEmpty(userFromStorage)) {
      if (userFromStorage.userType === "normal") history.push(`${USER_BOOK_PARKING}`);
      else if(userFromStorage.userType === "admin") history.push(`${ADMIN_USERS}`)
    }
  }, []);

  const onFinish = (values) => {
    setLoader(true);
    const { email, password } = values;
    FirebaseDb.auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then((user) => {
        FirebaseDb.database()
          .ref(`/users/${user.user.uid}`)
          .once("value")
          .then((userInfo) => {
            setLoader(false);
            saveToLocal("userInformation", {
              ...userInfo.val().info,
              uid: user.user.uid,
            });
            if (userInfo.val().info.userType === "admin") {
              history.push(`${ADMIN_USERS}`);
            } else if (userInfo.val().info.userType === "normal") {
              history.push(`${USER_BOOK_PARKING}`);
            }
          })
          .catch((err) => {
            setLoader(false);
            alert(err);
          });
      })
      .catch((e) => {
        setLoader(false);
        setErrMsg(e.message);
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
                <h2>Login to your account</h2>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please input your valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
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
    </>
  );
};
