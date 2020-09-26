import React from "react";
import { Col } from "antd";

export default ({ children }) => {
  return (
    <Col span="18">
      <div className="card">{children}</div>
    </Col>
  );
};
