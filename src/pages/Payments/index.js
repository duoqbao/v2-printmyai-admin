import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Card,
  Row,
  Table,
  Tag,
  Modal,
  Input,
  Typography,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ApiUsers from "api/users";
import { InputNumber } from "antd";

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
        return <span>{moment(item).format("hh:mm A, DD-MM-YYYY ")}</span>;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (item) => {
        return <span>{`$ ${formattedNumber(item || 0) || 0}`}</span>;
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

  const [modal2Open, setModal2Open] = useState(false);
  const [value, setValue] = useState(0);
  const [refundLoading, setRefundLoading] = useState(false);
  const handleRefund = async () => {
    try {
      setRefundLoading(true);
      await ApiUsers.refund(id, value);
      message.success("added");
      setModal2Open(false);
    } catch (err) {
      message.error(err);
    } finally {
      setRefundLoading(false);
    }
  };
  return (
    <div className="layout-styles order">
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={`Payment by ${user?.username}`}
      >
        <Row justify={"end"}>
          <Button
            type="primary"
            style={{ margin: 5 }}
            onClick={() => setModal2Open(true)}
          >
            Add Credit
          </Button>
          <Modal
            centered
            open={modal2Open}
            onOk={handleRefund}
            confirmLoading={refundLoading}
            onCancel={() => setModal2Open(false)}
          >
            <Typography.Text>Add credit manual</Typography.Text>
            <br />
            <InputNumber
              onChange={(e) => setValue(e)}
              placeholder="amount"
              style={{ borderRadius: 5 }}
              min={1}
            />
          </Modal>
        </Row>
        <Table loading={loading} columns={columns} dataSource={data} />
      </Card>
    </div>
  );
}
