import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
} from "../Actions/Types";

const initialState = {
  user: {},
  err: "",
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { ...state, err: "" };
    case USER_REGISTER_FAILURE:
      return { ...state, err: action.payload };
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload, err: "" };
    case USER_LOGIN_FAILURE:
      return { ...state, err: "Incorrect Username / Password" };
    default:
      return state;
  }
};
