import React, { useEffect, useState } from "react";
import { Collapse, DatePicker } from "antd";
import moment from "moment";
import "./style.css";
import Floor1 from "./Floor1";
import FirebaseDb from "../../firebase";
import ParkingView from "../../components/ParkingView";
import BookingForm from "./BookingForm";
import { getFromLocal } from "../../utils/Cache";
const { Panel } = Collapse;

export default () => {
  const [slots, setSlots] = useState([]);
  const [slotDetail, setSlotDetail] = useState({});
  const [bookingModal, setBookingModal] = useState(false);
  const userFromStorage = getFromLocal("userInformation");
  const getSlots = () => {
    FirebaseDb.database()
      .ref("slots")
      .once("value", (slot) => setSlots(Object.values(slot.val())));
  };
  const filterSlots = (area) => {
    const slotsbyArea = slots.filter((item) => item.info.area === area);
    return slotsbyArea;
  };
  useEffect(() => {
    getSlots();
  }, []);

  const onSlotClick = (val) => {
    console.log(val.info);
    setSlotDetail(val.info);
    setBookingModal(true);
  };

  const onConfirmBooking = (obj) => {
    let object = {
      booking: {
        status: true,
        slotName: slotDetail && slotDetail.name,
        slotArea: slotDetail && slotDetail.area,
        uid: userFromStorage && userFromStorage.uid,
        
      },
    };
    console.log("onConfirmBooking: ", obj);
    setBookingModal(false);
  };

  return (
    <>
      <div className="heading-with-item">
        <h2>Book a Slot</h2>
      </div>
      <Collapse accordion className="slots-collapse" defaultActiveKey={["1"]}>
        <Panel header="First Floor" key="1">
          <ParkingView
            collection={filterSlots("1")}
            onSlotClick={onSlotClick}
          />
        </Panel>
        <Panel header="Area 2" key="2">
          <ParkingView
            collection={filterSlots("2")}
            onSlotClick={onSlotClick}
          />
        </Panel>
        <Panel header="Third Floor" key="3">
          <ParkingView
            collection={filterSlots("3")}
            onSlotClick={onSlotClick}
          />
        </Panel>
      </Collapse>
      <BookingForm
        modalVisible={bookingModal}
        onCancel={() => setBookingModal(false)}
        onConfirmBooking={onConfirmBooking}
        slotDetail={slotDetail}
      />
    </>
  );
};
