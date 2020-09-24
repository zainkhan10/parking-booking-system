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
import { LOGIN, REGISTER } from "./routingNames";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={REGISTER} component={Register} />
        {/* <PrivateRoute component={protectedRoutes} /> */}
      </Switch>
    </Router>
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  //   const user = useSelector((state) => state.userReducer.currentUser);
  const user = "";
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
// const protectedRoutes = () => {
//   return (
//     <Switch>
//       <Route path="/company" component={Layout} />
//       <Route path="/candidate" component={Layout} />
//       <Redirect to="/" />
//     </Switch>
//   );
// };
