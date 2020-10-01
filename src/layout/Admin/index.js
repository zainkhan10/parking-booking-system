import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Col, Row } from "antd";
import Header from "./Header";
import ContentContainer from "./ContentContainer";
import Sidebar from "./Sidebar";
import Content from "./Content";
import {
  ADMIN,
  ADMIN_FEEDBACKS,
  ADMIN_USERS,
  ADMIN_BOOKINGS, ADMIN_BOOK_PARKING
} from "../../constants/routingNames";
import Bookings from "../../pages/Admin/Bookings";
import Users from "../../pages/Admin/Users";
import Feedbacks from "../../pages/Admin/Feedbacks";
import BookParking from '../../pages/Admin/BookParking'

export default (props) => {
  return (
    <>
      <Route
        path={ADMIN}
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
                      <Route
                          exact
                          path={`${ADMIN_BOOK_PARKING}`}
                          component={BookParking}
                        />
                        <Route
                          exact
                          path={`${ADMIN_BOOKINGS}`}
                          component={Bookings}
                        />
                        <Route
                          exact
                          path={`${ADMIN_USERS}`}
                          component={Users}
                        />
                        <Route
                          exact
                          path={`${ADMIN_FEEDBACKS}`}
                          component={Feedbacks}
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
