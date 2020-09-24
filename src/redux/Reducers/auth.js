import { USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from "../Actions/Types";

const initialState = {
  user: {},
  err: "",
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { ...state };
    case USER_REGISTER_FAILURE:
      return { ...state, err: action.payload };
    default:
      return state;
  }
};
