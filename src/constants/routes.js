import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import _ from "lodash";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { ADMIN, LOGIN, REGISTER, USER } from "./routingNames";
import Layout from '../layout'
import { useSelector } from "react-redux";

export default () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route exact path="/" component={Login} />
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={REGISTER} component={Register} />
        <PrivateRoute component={protectedRoutes} />
      </Switch>
    </Router>
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !_.isEmpty(user) ? (
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
