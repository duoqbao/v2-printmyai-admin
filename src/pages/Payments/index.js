import React, { useEffect, useState } from "react";
import moment from "moment";
import { Card, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ApiUsers from "api/users";
const formattedNumber = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};
const colorStatus = {
  initialize: "blue",
  successed: "green",
  failed: "red",
};
export default function Payments() {
  const parram = useParams();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { id } = parram;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Payment Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Payment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => {
        return <span>{moment(item).format("DD-MM-YYYY HH:mm")}</span>;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (item) => {
        return <span>{`$ ${formattedNumber(item / 100 || 0) || 0}`}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        return <Tag color={colorStatus[item]}>{item}</Tag>;
      },
    },
  ];
  const getData = async () => {
    try {
      setLoading(true);
      const res = await ApiUsers.getPaymentById(id);
      setData(res?.map((item) => ({ ...item, key: item._id }))?.reverse());
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    if (user === null) {
      history.push("/users");
    }
    getData();
  }, [id]);
  return (
    <div className="layout-styles order">
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={`Payment by ${user?.username}`}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          
        />
      </Card>
    </div>
  );
}
