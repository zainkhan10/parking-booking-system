import React from "react";
import { Row } from "antd";

export default ({ children }) => {
  return (
    <div className="content">
      <div className="container">
        <Row gutter="30">{children}</Row>
      </div>
    </div>
  );
};
