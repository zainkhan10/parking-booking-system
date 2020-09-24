import React from "react";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./App.css";
import Routes from "./constants/routes";
import { ConfigureStore } from "./redux/Store";

function App() {
  return (
    <Provider store={ConfigureStore()}>
      <Routes />
    </Provider>
  );
}

export default App;
