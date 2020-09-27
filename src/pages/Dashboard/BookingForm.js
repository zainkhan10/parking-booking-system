import React, { useState } from "react";
import { Col, DatePicker, Descriptions, Row, Select, Form, Button } from "antd";
import moment from "moment";
import {
  PARKING_DURATION,
  SLOTS_1,
  START_TIME,
} from "../../constants/variables";
import Modal from "../../components/Modal";
import ParkingView from "../../components/ParkingView";
const { Option } = Select;

export default ({ modalVisible, onConfirmBooking, slotDetail, onCancel }) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };
  const onDateSelect = (date, dateString) => {
    console.log(date, dateString);
  };
  const onStartTimeSelect = (values) => {
    console.log("Success:", values);
  };
  const onDurationSelect = (values) => {
    console.log("Success:", values);
  };
  const checkAvailablity = (values) => {};
  const onSlotClick = (item) => {
    console.log("detail: ", item);
    // setSlotDetail(item);
    // setBookingModal(true);
  };
  return (
    <>
      <Modal
        visible={modalVisible}
        title={"Book a Slot"}
        onOk={() => console.log("okay")}
        onCancel={() => onCancel()}
      >
        <Descriptions title="Slot Information">
          <Descriptions.Item label="Slot Name" style={{textTransform:'capitalize'}}>
            {slotDetail && slotDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label="Slot Area">
            {slotDetail && slotDetail.area}
          </Descriptions.Item>
        </Descriptions>
        <Form
          name="slot-selection"
          layout="vertical"
          onFinish={checkAvailablity}
        >
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item
                label="Select Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please select a date",
                  },
                ]}
              >
                <DatePicker
                  onChange={onDateSelect}
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[
                  {
                    required: true,
                    message: "Please select start time",
                  },
                ]}
              >
                <Select
                  placeholder="Please Select"
                  style={{ width: "100%" }}
                  onChange={onStartTimeSelect}
                >
                  {START_TIME.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: "Please select duration",
                  },
                ]}
              >
                <Select
                  placeholder="Please Select"
                  style={{ width: "100%" }}
                  onChange={onDurationSelect}
                >
                  {PARKING_DURATION.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}slotDetail.inf
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  Check Availablity
                </Button>
              </Form.Item> */}
            </Col>
          </Row>
        </Form>
        {/* {slotsVisible && (
          <ParkingView collection={SLOTS_1} onSlotClick={onSlotClick} />
        )} */}
      </Modal>
    </>
  );
};
