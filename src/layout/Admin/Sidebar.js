import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { ADMIN_BOOKINGS, ADMIN_BOOK_PARKING, ADMIN_FEEDBACKS, ADMIN_USERS } from "../../constants/routingNames";
import FirebaseDb from "../../firebase";
import { removeFromLocal } from "../../utils/Cache";

export default ({ history }) => {
  const onLogout = () => {
    FirebaseDb.auth()
      .signOut()
      .then(() => {
        removeFromLocal("userInformation");
        history.push("/");
      });
  };
  return (
    <Col span="6">
      <div className="sidebar-cover bg-grey">
        <ul>
          <li>
            <Link to={`${ADMIN_BOOK_PARKING}`}>
              <i className="fa fa-th"></i>Book Parking
            </Link>
          </li>
          <li>
            <Link to={`${ADMIN_BOOKINGS}`}>
              <i className="fa fa-th"></i>Bookings
            </Link>
          </li>
          <li>
            <Link to={`${ADMIN_USERS}`}>
              <i className="fa fa-user"></i>Users
            </Link>
          </li>
          <li>
            <Link to={`${ADMIN_FEEDBACKS}`}>
              <i className="fa fa-comment"></i>Feedbacks
            </Link>
          </li>
          <li>
            <Link to="#" onClick={onLogout}>
              <i className="fa fa-sign-out"></i>Logout
            </Link>
          </li>
        </ul>
      </div>
    </Col>
  );
};
