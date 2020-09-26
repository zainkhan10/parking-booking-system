import React, { useState } from "react";
import { SLOTS_1 } from "../../constants/variables";
import ParkingView from "../../components/ParkingView";
import BookingForm from "./BookingForm";

export default () => {
  const [slotDetail, setSlotDetail] = useState({});
  const [bookingModal, setBookingModal] = useState(false);
  const onSlotClick = (item) => {
    setSlotDetail(item);
    setBookingModal(true);
  };
  const onConfirmBooking = (obj) => {
    console.log("onConfirmBooking: ", onConfirmBooking);
    setBookingModal(false);
  };
  return (
    <>
      <ParkingView collection={SLOTS_1} onSlotClick={onSlotClick} />
      <BookingForm
        modalVisible={bookingModal}
        onCancel={() => setBookingModal(false)}
        onConfirmBooking={onConfirmBooking}
        slotDetail={slotDetail}
      />
    </>
  );
};
