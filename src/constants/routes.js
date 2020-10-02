import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ADMIN, LOGIN, REGISTER, USER } from "./routingNames";
import _ from "lodash";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Layout from "../layout";
import { getFromLocal } from "../utils/Cache";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={REGISTER} component={Register} />
        <PrivateRoute component={protectedRoutes} />
      </Switch>
    </Router>
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const userFromStorage = getFromLocal("userInformation");
  return (
    <Route
      {...rest}
      render={(props) =>
        !_.isEmpty(userFromStorage) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};
const protectedRoutes = () => {
  return (
    <Switch>
      <Route path={`${ADMIN}`} component={Layout} />
      <Route path={`${USER}`} component={Layout} />
      <Redirect to="/" />
    </Switch>
  );
};
