import React from "react";
import { Tooltip } from "antd";
import moment from "moment";

// ************************ Normalize Users ************************

export const normalizeUsers = [
  {
    title: "Name",
    key: "name",
    render: (row) => row.info.fullName,
  },
  {
    title: "Email",
    key: "email",
    render: (row) => row.info.email,
  },
  {
    title: "Mobile",
    key: "mobile",
    render: (row) => row.info.mobile,
  },
  {
    title: "Action",
    key: "action",
    render: (row) => (
      <Tooltip title="Delete" placement="right">
        <button className="delete-btn">
          <i className="fa fa-trash"></i>
        </button>
      </Tooltip>
    ),
  },
];

// ************************ Normalize Feedbacks ************************

export const normalizeFeedbacks = [
  {
    title: "User",
    key: "username",
    render: (row) => row.username,
  },
  {
    title: "Feeling",
    key: "feeling",
    render: (row) => row.feeling,
  },
  {
    title: "Message",
    key: "message",
    render: (row) => row.message,
  },
  {
    title: "Date / Time",
    key: "dateTime",
    render: (row) => `${moment(row.dateTime).format("L")} ${moment(row.dateTime).format("LT")}`,
  },
];
