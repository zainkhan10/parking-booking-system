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
} from "../../constants/routingNames";
import Users from "../../pages/Admin/Users";
import Feedbacks from "../../pages/Admin/Feedbacks";

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
