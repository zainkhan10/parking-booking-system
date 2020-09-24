import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./Reducers/rootReducer";

const logger = createLogger();
export const ConfigureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk, logger));
