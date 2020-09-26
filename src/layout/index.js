import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import { ADMIN, USER } from "../constants/routingNames";
import UserLayout from "./User";
import AdminLayout from "./Admin";
import "./style.css";

export default (props) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <>
      <Switch>
        <Route
          path={USER}
          render={() => {
            if (!_.isEmpty(user) && user.userType === "normal") {
              return (
                <>
                  <UserLayout {...props} />
                </>
              );
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              );
            }
          }}
        />
        <Route
          path={ADMIN}
          render={() => {
            if (!_.isEmpty(user) && user.userType === "admin") {
              return (
                <>
                  <AdminLayout {...props} />
                </>
              );
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              );
            }
          }}
        />
      </Switch>
    </>
  );
};
