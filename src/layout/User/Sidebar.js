import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import {
  USER_BOOKINGS,
  USER_FEEDBACK,
  USER_SLOTS,
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

    // FirebaseDb.database()
    //   .ref()
    //   .child(`/slots/`)
    //   .set({
    //     slot1: {
    //       info: {
    //         name: "slot1",
    //         id: "1",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },

    //     slot2: {
    //       info: {
    //         name: "slot2",
    //         id: "2",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot3: {
    //       info: {
    //         name: "slot3",
    //         id: "3",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot4: {
    //       info: {
    //         name: "slot4",
    //         id: "4",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot5: {
    //       info: {
    //         name: "slot5",
    //         id: "5",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot6: {
    //       info: {
    //         name: "slot6",
    //         id: "6",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot7: {
    //       info: {
    //         name: "slot7",
    //         id: "7",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot8: {
    //       info: {
    //         name: "slot8",
    //         id: "8",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot9: {
    //       info: {
    //         name: "slot9",
    //         id: "9",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot10: {
    //       info: {
    //         name: "slot10",
    //         id: "10",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot11: {
    //       info: {
    //         name: "slot11",
    //         id: "11",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot12: {
    //       info: {
    //         name: "slot12",
    //         id: "12",
    //         area: "1",
    //       },
    //       bookings: {},
    //     },
    //     slot13: {
    //       info: {
    //         name: "slot13",
    //         id: "13",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot14: {
    //       info: {
    //         name: "slot14",
    //         id: "14",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot15: {
    //       info: {
    //         name: "slot15",
    //         id: "15",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot16: {
    //       info: {
    //         name: "slot16",
    //         id: "16",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot17: {
    //       info: {
    //         name: "slot17",
    //         id: "17",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot18: {
    //       info: {
    //         name: "slot18",
    //         id: "18",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot19: {
    //       info: {
    //         name: "slot19",
    //         id: "19",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot20: {
    //       info: {
    //         name: "slot20",
    //         id: "20",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot21: {
    //       info: {
    //         name: "slot21",
    //         id: "21",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot22: {
    //       info: {
    //         name: "slot22",
    //         id: "22",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot23: {
    //       info: {
    //         name: "slot23",
    //         id: "23",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot24: {
    //       info: {
    //         name: "slot24",
    //         id: "24",
    //         area: "2",
    //       },
    //       bookings: {},
    //     },
    //     slot25: {
    //       info: {
    //         name: "slot25",
    //         id: "25",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot26: {
    //       info: {
    //         name: "slot26",
    //         id: "26",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot27: {
    //       info: {
    //         name: "slot27",
    //         id: "27",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot28: {
    //       info: {
    //         name: "slot28",
    //         id: "28",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot29: {
    //       info: {
    //         name: "slot29",
    //         id: "29",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot30: {
    //       info: {
    //         name: "slot30",
    //         id: "30",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot31: {
    //       info: {
    //         name: "slot31",
    //         id: "31",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot32: {
    //       info: {
    //         name: "slot32",
    //         id: "32",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot33: {
    //       info: {
    //         name: "slot33",
    //         id: "33",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot34: {
    //       info: {
    //         name: "slot34",
    //         id: "34",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot35: {
    //       info: {
    //         name: "slot35",
    //         id: "35",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //     slot36: {
    //       info: {
    //         name: "slot36",
    //         id: "36",
    //         area: "3",
    //       },
    //       bookings: {},
    //     },
    //   })
    //   .then((res) => console.log("reg user: ", res))
    //   .catch((err) => console.log("set user err: ", err));
  };
  return (
    <Col span="6">
      <div className="sidebar-cover bg-grey">
        <ul>
          <li>
            <Link to={`${USER_SLOTS}`}>
              <i className="fa fa-th"></i>Book Parking
            </Link>
          </li>
          <li>
            <Link to={`${USER_BOOKINGS}`}>
              <i className="fa fa-th"></i>My Bookings
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-user"></i>Profile
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
