import React, { useEffect, useState } from "react";
import apiCoupon from "../../api/coupon";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
export default function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiCoupon.getList();
      setCoupons(data);
      setLoading(false);
    })();
  }, []);

  const createCoupon = async (fields) => {
    try {
      const data = await apiCoupon.create(fields);
      setCoupons([...coupons, data]);
      setOpen(false);
      form.resetFields();
    } catch (err) {
      message.error(JSON.stringify(err.response.data));
    }
  };
  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name ",
    },
    {
      key: "code",
      dataIndex: "code",
      title: "Code ",
    },
    {
      key: "percent",
      dataIndex: "percent",
      title: "Percent discount",
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "createdAt",
      render: (text) => (
        <Typography.Text>
          {moment(new Date(text)).format("hh:mm A, DD/MM/YYYY")}
        </Typography.Text>
      ),
    },
    {
      key: "options",
      render: (item) => (
        <Button
          icon={<DeleteFilled />}
          type="primary"
          danger
          onClick={() => onDelete(item)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const onDelete = async (item) => {
    await apiCoupon.remove(item._id);
    setCoupons((coupons) => coupons.filter((i) => i._id != item._id));
  };
  return (
    <div className="layout-styles">
      <Row gutter={[24, 24]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Coupon Management"
          >
            <div
              style={{ display: "flex", justifyContent: "right", padding: 12 }}
            >
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                type="primary"
                icon={<PlusOutlined />}
              >
                Create
              </Button>
            </div>
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={coupons}
                pagination={false}
                className="ant-border-space"
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => createCoupon(form.getFieldValue())}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            required
            help="Space digit isn't available, we'll trim it"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Percent discount" name="percent" required>
            <Input type={"number"} max={100} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
