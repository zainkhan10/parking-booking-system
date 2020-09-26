import React from "react";
import { Row, Col } from "antd";
import _ from "lodash";
import Car from "../assets/images/car.png";
import Road from "../assets/images/road.png";

export default ({ collection, onSlotClick }) => {
  return (
    <div className="slots-cover">
      <Row>
        {!_.isEmpty(collection) &&
          collection.map((item, index) => {
            return (
              <>
                <Col
                  span={4}
                  key={index}
                  className="slot-col"
                  style={
                    (index === 0 || index === 6) && {
                      borderLeftWidth: 4,
                      borderLeftColor: "#e0dddd",
                      borderLeftStyle: "solid",
                    }
                  }
                >
                  <button
                    className="slot"
                    type="button"
                    disabled={item.status === "Booked"}
                    onClick={() => onSlotClick(item)}
                  >
                    <div className="slot-name">
                      <h4>{item.name}</h4>
                    </div>
                    {item.status === "Booked" ? (
                      <img src={Car} className="car-img" />
                    ) : (
                      <div className="slot-free">
                        <p>Park here</p>
                      </div>
                    )}
                  </button>
                </Col>
                {index === 5 && (
                  <Col span={24} key={`road${index}`}>
                    <Row gutter={40}>
                      <Col span={24} className="p-0">
                        <img src={Road} className="road-image" />
                      </Col>
                    </Row>
                  </Col>
                )}
              </>
            );
          })}
      </Row>
    </div>
  );
};
