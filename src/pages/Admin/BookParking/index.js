import React, { useEffect, useState } from "react";
import {
  Collapse,
  DatePicker,
  Spin,
  Select,
  Form,
  Row,
  Col,
  Button,
} from "antd";
import moment from "moment";
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
import { uuid } from "uuidv4";
import "./style.css";
import FirebaseDb from "../../../firebase";
import ParkingView from "../../../components/ParkingView";
import { getFromLocal } from "../../../utils/Cache";
import { PARKING_DURATION, START_TIME } from "../../../constants/variables";
import AlertBox from "../../../components/AlertMsg";
const { Panel } = Collapse;
const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const userFromStorage = getFromLocal("userInformation");
  const [successMsg, setSuccessMsg] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [loader, setLoader] = useState(false);
  const [slots, setSlots] = useState([]);
  const [slotDetail, setSlotDetail] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});

  const getSlots = () => {
    setLoader(true);
    FirebaseDb.database()
      .ref("slots")
      .once("value", (slot) => {
        setSlots(Object.values(slot.val()));
        setLoader(false);
      });
  };

  const filterSlots = (area) => {
    const slotsbyArea = slots.filter((item) => item.info.area === area);
    return slotsbyArea;
  };

  useEffect(() => {
    getSlots();
  }, []);

  const onSlotClick = (val) => {
    setSlotDetail(val.info);
    setConfirmBox(true);
  };

  const onConfirmBooking = () => {
    setLoader(true);
    const slotName = slotDetail.name.replace(" ", "");
    const bookingDate =
      moment(bookingDetails.date._d).format("YYYY-MM-DD") +
      "T" +
      bookingDetails.startTime;
    const startDate = new Date(bookingDate).getTime();
    const duration = Number(bookingDetails.duration[0]);
    const endDate = moment(startDate).add(duration, "hours").unix() * 1000;
    FirebaseDb.database()
      .ref(`slots/${slotName}/booking`)
      .push({
        status: true,
        slotName: slotDetail.name,
        slotArea: slotDetail.area,
        uid: userFromStorage.uid,
        username: userFromStorage.fullName,
        bookingID: uuid(),
        startDate,
        endDate,
      })
      .then((res) => {
        getSlots();
        setSuccessMsg(true);
      })
      .catch((err) => console.log(err));
    setConfirmBox(false);
  };

  const disabledDate = (current) => current && current < moment().endOf("day");

  const checkAvailablity = (values) => {
    setShowSlots(true);
    setBookingDetails(values);
  };

  return (
    <>
      <Spin spinning={loader}>
        <div className="heading-with-item">
          <h2>Book a Slot</h2>
        </div>
        <Form
          form={form}
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
                val
              >
                <DatePicker
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
                <Select placeholder="Please Select" style={{ width: "100%" }}>
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
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  {PARKING_DURATION.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Check Availablity
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {showSlots && !_.isEmpty(bookingDetails) && (
          <Collapse
            accordion
            className="slots-collapse"
            defaultActiveKey={["1"]}
          >
            <Panel header="Area 1" key="1">
              <ParkingView
                key={"area 1"}
                collection={filterSlots("1")}
                onSlotClick={onSlotClick}
                bookingDetails={bookingDetails}
              />
            </Panel>
            <Panel header="Area 2" key="2">
              <ParkingView
                key={"area 2"}
                collection={filterSlots("2")}
                onSlotClick={onSlotClick}
                bookingDetails={bookingDetails}
              />
            </Panel>
            <Panel header="Area 3" key="3">
              <ParkingView
                key={"area 3"}
                collection={filterSlots("3")}
                onSlotClick={onSlotClick}
                bookingDetails={bookingDetails}
              />
            </Panel>
          </Collapse>
        )}
      </Spin>
      {confirmBox && (
        <SweetAlert
          type="warning"
          title={"Confirm"}
          onCancel={() => setConfirmBox(false)}
          onConfirm={onConfirmBooking}
          showCancel
          confirmBtnCssClass="ant-btn ant-btn-primary"
        >
          Do you want to book {slotDetail.name} in area {slotDetail.area}?
        </SweetAlert>
      )}
      {successMsg && (
        <AlertBox
          title="Slot Booked"
          description="You have successfully booked a slot."
          onConfirm={() => setSuccessMsg(false)}
          type="success"
        />
      )}
    </>
  );
};
