import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default ({ title, description, onConfirm, type }) => {
  return (
    <SweetAlert
      type={type}
      title={title}
      onConfirm={() => {
        onConfirm();
      }}
      confirmBtnCssClass="ant-btn ant-btn-primary"
    >
      {description}
    </SweetAlert>
  );
};
