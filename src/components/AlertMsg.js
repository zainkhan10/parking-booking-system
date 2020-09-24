import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux";
import { actionDispatch } from "../redux/Actions/Creators/actionDispatcher";
import { HIDE_SUCCESS_MSG } from "../redux/Actions/Types";

export default ({ title, description, onConfirm, type }) => {
  const dispatch = useDispatch();
  return (
    <SweetAlert
      type={type}
      title={title}
      onConfirm={() => {
        onConfirm();
        dispatch(actionDispatch(HIDE_SUCCESS_MSG))
      }}
      confirmBtnCssClass="ant-btn ant-btn-primary"
    >
      {description}
    </SweetAlert>
  );
};
