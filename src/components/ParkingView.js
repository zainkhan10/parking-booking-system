import React from "react";
import { Row, Col } from "antd";
import _ from "lodash";
import moment from "moment";
import Car from "../assets/images/car.png";
import Road from "../assets/images/road.png";

export default ({ collection, onSlotClick, bookingDetails }) => {
  // ******************** Date / Time Calculation ********************
  const bookingDate =
    moment(bookingDetails.date._d).format("YYYY-MM-DD") +
    "T" +
    bookingDetails.startTime;
  const startDate = new Date(bookingDate).getTime();
  const duration = Number(bookingDetails.duration[0]);
  const endDate = moment(startDate).add(duration, "hours").unix() * 1000;
  // ******************** Date / Time Calculation ********************
  const isBooked = (slotStartDate, slotEndDate) => {
    const isSlotBooked = slotStartDate === startDate && slotEndDate >= endDate;
    return isSlotBooked;
  };
  return (
    <div className="slots-cover">
      <Row>
        {!_.isEmpty(collection) &&
          collection.map((item, index) => {
            const sortBookings =
              _.has(item, "booking") && Object.values(item.booking);

            const findBookings =
              _.has(item, "booking") &&
              sortBookings.find((e) => {
                return (
                  e.slotName === item.info.name && e.startDate === startDate
                );
              });
            return (
              <>
                <Col
                  span={4}
                  key={`area${item.info.area}${index}`}
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
                    disabled={
                      !_.isEmpty(findBookings) &&
                      isBooked(findBookings.startDate, findBookings.endDate)
                    }
                    onClick={() => onSlotClick(item)}
                  >
                    <div className="slot-name">
                      <h4>{item.info.name}</h4>
                    </div>
                    {!_.isEmpty(findBookings) &&
                    isBooked(findBookings.startDate, findBookings.endDate) ? (
                      <img src={Car} className="car-img" alt="Car" />
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
                        <img src={Road} className="road-image" alt="Road" />
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
