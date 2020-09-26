import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Col span="6">
      <div className="sidebar-cover bg-grey">
        <ul>
          <li>
            <Link to="#">
              <i className="fa fa-th"></i>Book Parking
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-th"></i>My Bookings
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-user"></i>Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-comment"></i>Feedback
            </Link>
          </li>
        </ul>
      </div>
    </Col>
  );
};
