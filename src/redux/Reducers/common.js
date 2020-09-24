import { HIDE_SUCCESS_MSG, SHOW_SUCCESS_MSG } from "../Actions/Types";

const initialState = {
  success: false,
};
export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS_MSG:
      return { ...state, success: true };
    case HIDE_SUCCESS_MSG:
      return { ...state, success: false };
    default:
      return state;
  }
};
