import React from "react";
import { Collapse, DatePicker } from "antd";
import moment from 'moment'
import "./style.css";
import Floor1 from "./Floor1";
const { Panel } = Collapse;


export default () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <>
      <div className="heading-with-item">
        <h2>Book a Slot</h2>
      </div>
      <Collapse accordion className="slots-collapse" defaultActiveKey={["1"]}>
        <Panel header="First Floor" key="1">
          <Floor1 />
        </Panel>
        <Panel header="Second Floor" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="Third Floor" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </>
  );
};
