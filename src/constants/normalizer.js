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
];

// ************************ Normalize Users End ************************

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
    render: (row) =>
      `${moment(row.dateTime).format("L")} ${moment(row.dateTime).format(
        "LT"
      )}`,
  },
];

// ************************ Normalize Feedbacks End ************************

// ************************ Normalize User Bookings ************************

export const normalizeUserBookings = (deleteBooking) => {
  const columns = [
    {
      title: "Slot Name",
      key: "slotName",
      render: (row) => (
        <span style={{ textTransform: "capitalize" }}>
          {row.slotName}
        </span>
      ),
    },
    {
      title: "Area",
      key: "slotArea",
      render: (row) => row.slotArea,
    },
    {
      title: "Start Date / Time",
      key: "startDate",
      render: (row) =>
        `${moment(row.startDate).format("L")} ${moment(
          row.startDate
        ).format("LT")}`,
    },
    {
      title: "End Date / Time",
      key: "endDate",
      render: (row) =>
        `${moment(row.endDate).format("L")} ${moment(
          row.endDate
        ).format("LT")}`,
    },
    {
      title: "",
      key: "action",
      render: (row) => (
        <Tooltip title="Cancel Booking">
          <button className="delete-btn" onClick={() => deleteBooking(row.slotName, row.bookingID)}>
            <i className="fa fa-trash"></i>
          </button>
        </Tooltip>
      ),
    },
  ];
  return columns;
};

// ************************ Normalize User Bookings End ************************

// ************************ Normalize Admin Bookings ************************

export const normalizeAdminBookings = (deleteBooking) => {
  const columns = [
    {
      title: "Slot Name",
      key: "slotName",
      render: (row) => (
        <span style={{ textTransform: "capitalize" }}>
          {row.slotName}
        </span>
      ),
    },
    {
      title: "Area",
      key: "slotArea",
      render: (row) => row.slotArea,
    },
    {
      title: "User",
      key: "username",
      render: (row) => row.username,
    },
    {
      title: "Start Date / Time",
      key: "startDate",
      render: (row) =>
        `${moment(row.startDate).format("L")} ${moment(
          row.startDate
        ).format("LT")}`,
    },
    {
      title: "End Date / Time",
      key: "endDate",
      render: (row) =>
        `${moment(row.endDate).format("L")} ${moment(
          row.endDate
        ).format("LT")}`,
    },
    {
      title: "",
      key: "action",
      render: (row) => (
        <Tooltip title="Cancel Booking">
          <button className="delete-btn" onClick={() => deleteBooking(row.slotName, row.bookingID)}>
            <i className="fa fa-trash"></i>
          </button>
        </Tooltip>
      ),
    },
  ];
  return columns;
};

// ************************ Normalize Admin Bookings End ************************