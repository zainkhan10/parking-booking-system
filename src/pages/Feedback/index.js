import React, { useState } from "react";
import { Col, Radio, Row } from "antd";

export default () => {
  const [feeling, setFeeling] = useState("");
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const onRadioSelect = (val) => {};
  return (
    <>
      <div className="heading-with-item">
        <h2>Give Feedback</h2>
      </div>
      <Row>
        <Col span={25}>
          <Radio.Group onChange={onRadioSelect} value={feeling}>
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
        </Col>
      </Row>
    </>
  );
};
