import _ from "lodash";
import {
  GET_USERS_FAILURE,
  SHOW_SUCCESS_MSG,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
} from "../Types";
import { actionDispatch } from "./actionDispatcher";
import FirebaseDb from "../../../firebase";
import { saveToLocal } from "../../../utils/Cache";
import { USER_SLOTS } from "../../../constants/routingNames";
import fireDb from "../../../firebase";

export const createUser = (DTO) => (dispatch) => {
  // FirebaseDb.child("users").push(DTO, (err) => {
  //   if (err) dispatch(actionDispatch(USER_REGISTER_FAILURE, err));
  //   else {
  //     dispatch(actionDispatch(SHOW_SUCCESS_MSG));
  //     dispatch(actionDispatch(USER_REGISTER_SUCCESS));
  //   }
  // });
  let path = FirebaseDb.database().ref().child("users");
  FirebaseDb.auth()
    .createUserWithEmailAndPassword(DTO.email, DTO.password)
    .then((user) => {
      path
        .child(`${user.user.uid}`)
        .set({
          info: {
            fullName: DTO.name,
            email: DTO.email,
            mobile: DTO.mobile,
            userType: "normal",
          },
          selected: {
            slotBooked: "",
          },
        })
        .then((res) => console.log("reg user: ", user))
        .catch((err) => console.log("set user err: ", err));
    })
    .catch((error) => alert(error));
};

export const verifyUser = (email, password, redirectToDashboard) => (
  dispatch
) => {
  // FirebaseDb.child("users").on("value", (snapshot) => {
  //   if (snapshot.val() !== null) {
  //     {
  //       const users = Object.values(snapshot.val());
  //       const checkUser = users.find(
  //         (item) => item.username === username && item.password === password
  //       );
  //       if (!_.isEmpty(checkUser)) {
  //         dispatch(actionDispatch(USER_LOGIN_SUCCESS, checkUser));
  //         saveToLocal("userInformation", checkUser);
  //       } else {
  //         dispatch(actionDispatch(USER_LOGIN_FAILURE));
  //       }
  //     }
  //   } else dispatch(actionDispatch(GET_USERS_FAILURE));
  // });
  // history.push(`${USER_SLOTS}`)

  if (email === "parkingadmin@gmail.com" && password === "password") {
    window.location = "/admindashboard/currentreservations";
    return;
  }
  fireDb
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      fireDb
        .database()
        .ref(`/users/${user.user.uid}`)
        .once("value")
        .then((userInfo) => {
          saveToLocal("userInformation", userInfo.val().info);
          redirectToDashboard();
        })
        .catch((err) => console.log(err));
    })
    .catch((e) => {
      alert(e);
    });
};
