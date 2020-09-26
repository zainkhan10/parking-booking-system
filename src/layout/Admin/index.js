import React from "react";
import Header from "./Header";
import ContentContainer from "./ContentContainer";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <Sidebar />
        <Content />
      </ContentContainer>
    </>
  );
};
