import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Col, Row } from "antd";
import {
  USER,
  USER_BOOKINGS,
  USER_FEEDBACK,
  USER_SLOTS,
} from "../../constants/routingNames";
import Header from "./Header";
import ContentContainer from "./ContentContainer";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Slots from "../../pages/User/Dashboard";
import Bookings from "../../pages/User/Bookings";
import Feedback from "../../pages/User/Feedback";

export default (props) => {
  return (
    <>
      <Route
        path={USER}
        render={({ match: { url } }) => {
          return (
            <>
              <Header {...props} />
              <ContentContainer>
                <Sidebar history={props.history} />
                <Content>
                  <Row>
                    <Col span={24}>
                      <Switch>
                        <Route exact path={`${USER_SLOTS}`} component={Slots} />
                        <Route
                          exact
                          path={`${USER_BOOKINGS}`}
                          component={Bookings}
                        />
                        <Route
                          exact
                          path={`${USER_FEEDBACK}`}
                          component={Feedback}
                        />
                        <Redirect to={{ pathname: "/" }} />
                      </Switch>
                    </Col>
                  </Row>
                </Content>
              </ContentContainer>
            </>
          );
        }}
      />
    </>
  );
};
