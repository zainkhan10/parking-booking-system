import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import { ADMIN, USER } from "../constants/routingNames";
import UserLayout from "./User";
import AdminLayout from "./Admin";
import "./style.css";
import { getFromLocal } from "../utils/Cache";

export default (props) => {
  const userFromStorage = getFromLocal("userInformation");
  return (
    <>
      <Switch>
        <Route
          path={USER}
          render={() => {
            if (!_.isEmpty(userFromStorage) && userFromStorage.userType === "normal") {
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
            if (
              !_.isEmpty(userFromStorage) &&
              userFromStorage.userType === "admin"
            ) {
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
