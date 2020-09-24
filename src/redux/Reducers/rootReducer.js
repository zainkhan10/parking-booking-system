import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { commonReducer } from "./common";
import { userReducer } from "./users";

export default combineReducers({
  commonReducer,
  authReducer,
  userReducer,
});
