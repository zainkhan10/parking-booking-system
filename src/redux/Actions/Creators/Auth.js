import {
  SHOW_SUCCESS_MSG,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
} from "../Types";
import { actionDispatch } from "./actionDispatcher";
import FirebaseDb from "../../../firebase";

export const createUser = (DTO) => (dispatch) => {
  FirebaseDb.child("users").push(DTO, (err) => {
    if (err) dispatch(actionDispatch(USER_REGISTER_FAILURE, err));
    else {
      dispatch(actionDispatch(SHOW_SUCCESS_MSG));
      dispatch(actionDispatch(USER_REGISTER_SUCCESS));
    }
  });
};
