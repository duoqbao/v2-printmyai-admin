import { Card, Row, Col, Table, Pagination, Button, Popconfirm } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "store/modules/user/index";
import ApiUsers from "api/users";
import "./index.scss";
import { DeleteOutlined } from "@ant-design/icons";
export default function Users() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    current: 1,
    limit: 10,
    total: 0,
    skip: 0,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (filters) => {
    try {
      setLoading(true);
      const { users, total } = await ApiUsers.getUsers(filters);
      setData(
        users.map((item) => {
          return { ...item, key: item._id };
        })
      );
      setFilters({ ...filters, total });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => {
        return <span>{moment(item).format("DD-MM-YYYY")}</span>;
      },
    },
    {
      title: "Fine Tunes",
      dataIndex: "tunes",
      key: "tunes",
      render: (item) => {
        const count = item.reduce((acc, item) => {
          if (Object.keys(item).length === 1) {
            return acc;
          } else {
            return acc + 1;
          }
        }, 0);
        return <div>{count}</div>;
      },
    },
    {
      key: "action",
      render: (record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <a
              onClick={() => {
                dispatch(setUser(record));
                history.push(`/users/orders`);
              }}
            >
              Show Order
            </a>
            <a
              onClick={() => {
                dispatch(setUser(record));
                history.push(`/users/${record._id}/payments`);
              }}
            >
              Show Payments
            </a>
          </div>
        );
      },
    },
    ,
    {
      title: "Action",
      key: "onAction",
      render: (record) => {
        return (
          <div>
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={async () => {
                await ApiUsers.deleteUser(record._id);
                getData();
              }}
              onCancel={() => {}}
            >
              <Button icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData(filters);
  }, [dispatch]);

  const handlePaginationChange = (page, pageSize) => {
    setFilters({ ...filters, current: page, skip: page - 1, limit: pageSize });
    getData({ ...filters, current: page, skip: page - 1, limit: pageSize });
  };
  return (
    <div className="layout-content">
      <Card
        bordered={false}
        className="criclebox tablespace mb-24 users"
        title="Users"
      >
        <Row gutter={[24, 12]}>
          <Col span={24}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </Col>
          <Col
            span={24}
            className="mb-24 mt-24"
            style={{ display: "flex", justifyContent: "end", padding: 30 }}
          >
            <Pagination
              current={filters.current}
              pageSize={filters.limit}
              total={filters.total}
              onChange={handlePaginationChange}
              showSizeChanger
              showQuickJumper
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
