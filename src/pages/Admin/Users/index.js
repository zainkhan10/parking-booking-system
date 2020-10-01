import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { normalizeUsers } from "../../../constants/normalizer";
import FirebaseDb from "../../../firebase";

export default () => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    setLoader(true);
    FirebaseDb.database()
      .ref("users")
      .once("value", (values) => {
        const usersList = Object.values(values.val());
        const filterUsers = usersList.filter(
          (item) => item.info.userType === "normal"
        );
        setUsers(filterUsers);
        setLoader(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="heading-with-item">
        <h2>Users</h2>
      </div>
      <Table
        dataSource={users}
        columns={normalizeUsers}
        loading={loader}
      />
    </>
  );
};
