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

export const createUser = (DTO) => (dispatch) => {
  FirebaseDb.child("users").push(DTO, (err) => {
    if (err) dispatch(actionDispatch(USER_REGISTER_FAILURE, err));
    else {
      dispatch(actionDispatch(SHOW_SUCCESS_MSG));
      dispatch(actionDispatch(USER_REGISTER_SUCCESS));
    }
  });
};

export const verifyUser = (username, password) => (dispatch) => {
  FirebaseDb.child("users").on("value", (snapshot) => {
    if (snapshot.val() !== null) {
      {
        const users = Object.values(snapshot.val());
        const checkUser = users.find(
          (item) => item.username === username && item.password === password
        );
        if (!_.isEmpty(checkUser)) {
          dispatch(actionDispatch(USER_LOGIN_SUCCESS, checkUser));
          saveToLocal("userInformation", checkUser);
        } else {
          dispatch(actionDispatch(USER_LOGIN_FAILURE));
        }
      }
    } else dispatch(actionDispatch(GET_USERS_FAILURE));
  });
};
