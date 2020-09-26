import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Col, Row } from "antd";
import { USER, USER_BOOKINGS, USER_SLOTS } from "../../constants/routingNames";
import Header from "./Header";
import ContentContainer from "./ContentContainer";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Slots from "../../pages/Dashboard";
import Bookings from "../../pages/Bookings";

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
                <Sidebar />
                <Content>
                  <Row>
                    <Col span={24}>
                      <Switch>
                        <Route
                          exact
                          path={`${USER_SLOTS}`}
                          component={Slots}
                        />
                         <Route
                          exact
                          path={`${USER_BOOKINGS}`}
                          component={Bookings}
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
