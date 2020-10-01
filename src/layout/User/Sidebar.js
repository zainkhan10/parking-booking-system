import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import {
  USER_BOOKINGS,
  USER_BOOK_PARKING,
  USER_FEEDBACK,
} from "../../constants/routingNames";
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
            <Link to={`${USER_BOOK_PARKING}`}>
              <i className="fa fa-th"></i>Book Parking
            </Link>
          </li>
          <li>
            <Link to={`${USER_BOOKINGS}`}>
              <i className="fa fa-th"></i>My Bookings
            </Link>
          </li>
          <li>
            <Link to={`${USER_FEEDBACK}`}>
              <i className="fa fa-comment"></i>Feedback
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
