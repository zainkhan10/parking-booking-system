import React from "react";
import { Modal } from "antd";

export default ({ title, visible, onOk, onCancel, children }) => {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      width={742}
    >
      {children}
    </Modal>
  );
};
