import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { normalizeFeedbacks } from "../../../constants/normalizer";
import FirebaseDb from "../../../firebase";

export default () => {
  const [loader, setLoader] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = () => {
    setLoader(true);
    FirebaseDb.database()
      .ref("admin/feedback/")
      .once("value", (values) => {
        setFeedbacks(Object.values(values.val()));
        setLoader(false);
      });
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      <div className="heading-with-item">
        <h2>Feedbacks</h2>
      </div>
      <Table
        dataSource={feedbacks}
        columns={normalizeFeedbacks}
        loading={loader}
      />
    </>
  );
};
