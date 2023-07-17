import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Card, Modal, Table, Tag,Row,Col } from "antd";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ApiUsers from "api/users";
const formattedNumber = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};
const colorStatus = {
  pending: "orange",
  successe: "green",
};
export default function Order() {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [itemOrder, setItemOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [isItem, setItem] = useState(false);
  const columns = [
    {
      title: "User Order",
      dataIndex: "",
      key: "name",
      render: (item) => {
        return (
          <span>
            {item?.address_to?.first_name} {item?.address_to?.last_name}
          </span>
        );
      },
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => {
        return <span>{moment(item).format("DD-MM-YYYY HH:mm")}</span>;
      },
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (item) => {
        return <span>{`$ ${formattedNumber(item / 100 || 0) || 0}`}</span>;
      },
    },
    {
      title: "Total Shipping",
      dataIndex: "total_shipping",
      key: "total_shipping",
      render: (item) => {
        return <span>{`$ ${formattedNumber(item / 100 || 0) || 0}`}</span>;
      },
    },
    {
      title: "Products",
      dataIndex: "line_items",
      key: "line_items",
      render: (item) => {
        return (
          <Button
            onClick={() => {
              setItemOrder(item);
              setItem(true);
            }}
            type="primary"
          >{`${(item && item.length) || 0} Item`}</Button>
        );
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
  useEffect(() => {
    if (user === null) {
      history.push("/users");
    } else {
      setData(user?.orders?.map((item) => ({ ...item, key: item._id }))?.reverse());
    }
  }, [user]);
  const columnsItem = [
    {
      title: "title",
      key: "title",
      render: (item) => {
        return <span>{item?.metadata?.title}</span>;
      },
    },
    {
      title: "Sku",
      key: "Sku",
      render: (item) => {
        return <span>{item?.metadata?.sku}</span>;
      },
    },
    {
      title: "Price",
      key: "Price",
      render: (item) => {
        return (
          <span>{`$ ${
            formattedNumber(item?.metadata?.price / 100 || 0) || 0
          }`}</span>
        );
      },
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];
  return (
    <div className="layout-styles order">
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={`Order by ${user?.username}`}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
      <Modal
        visible={isItem}
        onCancel={() => {
          setItem(false);
        }}
        width={1000}
        footer={null}
      >
        <Row gutter={[12,12]}>
          <Col span={24}>
            <Table
              scroll={{ x: 1000 }}
              columns={columnsItem}
              dataSource={itemOrder}
       
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
