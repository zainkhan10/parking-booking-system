import React, { useState } from "react";
import { Button, Input, Radio, Form, Spin } from "antd";
import { getFromLocal } from "../../../utils/Cache";
import FirebaseDb from "../../../firebase";
import AlertBox from "../../../components/AlertMsg";

export default () => {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const userFromStorage = getFromLocal("userInformation");

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const onSubmit = (values) => {
    setLoader(true);
    FirebaseDb.database()
      .ref("admin/feedback/" + userFromStorage.uid)
      .set({
        username: userFromStorage.fullName,
        email: userFromStorage.email,
        dateTime: new Date().toISOString(),
        feeling: values.feeling,
        message: values.message,
        uid: userFromStorage.uid,
      })
      .then((res) => {
        setSuccessMsg(true);
        form.resetFields();
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <>
      <Spin spinning={loader}>
        <div className="heading-with-item">
          <h2>Give Feedback</h2>
        </div>
        <Form name="feedback" onFinish={onSubmit} layout="vertical" form={form}>
          <Form.Item
            name="feeling"
            label="Overall how you feel about the service you received"
            rules={[
              {
                required: true,
                message: "Please select!",
              },
            ]}
          >
            <Radio.Group>
              <Radio style={radioStyle} value={"Very satisfied"}>
                Very satisfied
              </Radio>
              <Radio style={radioStyle} value={"Satisfied"}>
                Satisfied
              </Radio>
              <Radio
                style={radioStyle}
                value={"Neither satisfied or dissatisfied"}
              >
                Neither satisfied or dissatisfied
              </Radio>
              <Radio style={radioStyle} value={"Dissatisfied"}>
                Dissatisfied
              </Radio>
              <Radio style={radioStyle} value={"Very dissatisfied"}>
                Very dissatisfied
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="message"
            label="How Could we improve this service"
            rules={[
              {
                required: true,
                message: "Please input your message",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter Your Message ..." rows={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      {successMsg && (
        <AlertBox
          title="Feedback Sent"
          description="Your feedback has been successfully submitted."
          onConfirm={() => setSuccessMsg(false)}
          type="success"
        />
      )}
    </>
  );
};
