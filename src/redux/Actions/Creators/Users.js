import { GET_USERS_FAILURE, GET_USERS_SUCCESS } from "../Types";
import { actionDispatch } from "./actionDispatcher";
import FirebaseDb from "../../../firebase";

export const fetchUsers = () => (dispatch) => {
  FirebaseDb.child("users").on("value", (snapshot) => {
    if (snapshot.val() !== null)
      dispatch(actionDispatch(GET_USERS_SUCCESS, snapshot.val()));
    else dispatch(actionDispatch(GET_USERS_FAILURE));
  });
};

