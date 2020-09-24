import { GET_USERS_FAILURE, GET_USERS_SUCCESS } from "../Actions/Types";

const initialState = {
  users: [],
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case GET_USERS_FAILURE:
      return { ...state, users: [] };
    default:
      return state;
  }
};
