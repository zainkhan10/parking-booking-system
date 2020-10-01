import React, { useEffect, useState } from "react";
import { Table } from "antd";
import _ from "lodash";
import FirebaseDb from "../../../firebase";
import AlertBox from "../../../components/AlertMsg";
import { normalizeAdminBookings } from "../../../constants/normalizer";

export default () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const getAllBookings = () => {
    setLoader(true);
    FirebaseDb.database()
      .ref("slots/")
      .once("value", (values) => {
        let slots = [];
        const filterValues = Object.values(values.val());
        for (var i = 0; i < filterValues.length; i++) {
          if (_.has(filterValues[i], "booking"))
            slots = slots.concat(Object.values(filterValues[i].booking));
        }
        setBookedSlots(slots);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const deleteBooking = (slotName, bookingID) => {
    setLoader(true);
    const slot = slotName.replace(" ", "");
    const ref = FirebaseDb.database().ref(`slots/${slot}/booking`);
    const query = ref.orderByChild(`bookingID`).equalTo(bookingID);
    query.once("value", (snapshot) => {
      const bookingKey = Object.keys(snapshot.val());
      FirebaseDb.database()
        .ref(`slots/${slot}/booking/${bookingKey[0]}`)
        .remove()
        .then((res) => {
          setLoader(false);
          setSuccessMsg(true);
          getAllBookings();
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <div className="heading-with-item">
        <h2>Bookings</h2>
      </div>
      <Table
        dataSource={bookedSlots}
        columns={normalizeAdminBookings(deleteBooking)}
        loading={loader}
      />
      {successMsg && (
        <AlertBox
          title="Booking Cancelled"
          description="Booking Successfully Cancelled."
          onConfirm={() => setSuccessMsg(false)}
          type="success"
        />
      )}
    </>
  );
};
