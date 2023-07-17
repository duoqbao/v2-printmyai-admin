import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  message,
  Popconfirm,
  Modal,
  Input,
  Typography,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import ApiStyles from "api/styles";
export default function Styles() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDataById = (id) => {
    history.push({ pathname: `/category-styles/${id}/styles`, params: { id } });
  };
  const [openEdit, setOpenEdit] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "32%",
      render: (item) => <Typography.Text strong>{item}</Typography.Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <div style={{ display: "flex", gap: "6px" }}>
            <ModalEdit
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              item={item}
            />

            <Button
              onClick={() => {
                setOpenEdit(true);
              }}
              type="primary"
              icon={<EditFilled />}
            />
            <Button
              onClick={() => {
                getDataById(item._id);
              }}
              type="primary"
              icon={<EyeOutlined />}
            />
            <Popconfirm
              title="Are You Sure?"
              onConfirm={() => {
                deleteData(item._id);
              }}
              onCancel={() => {}}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const getData = async () => {
    setLoading(true);
    const res = await ApiStyles.getList();
    setData(
      res.map((item) => {
        return {
          ...item,
          key: item._id,
        };
      })
    );
    setLoading(false);
  };
  const deleteData = async (id) => {
    try {
      const res = await ApiStyles.delete(id);
      message.success("Successfully deleted");
      getData();
    } catch (error) {
      message.error(error.message);
    }
  };
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    getData();
  }, [openAddModal, openEdit]);

  return (
    <div className="layout-styles">
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Category"
          >
            <div
              style={{ display: "flex", justifyContent: "right", padding: 12 }}
            >
              <Button
                onClick={() => {
                  setOpenAddModal(true);
                }}
                type="primary"
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </div>
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <ModalCreate open={openAddModal} onClose={() => setOpenAddModal(false)} />
    </div>
  );
}

const ModalEdit = ({ open, onClose, item }) => {
  const [name, setName] = useState(item.name || "");
  const onOk = async () => {
    try {
      await ApiStyles.updateCategoryById(item._id, { name });
      setName("");
      message.success("Success");
      onClose();
    } catch (err) {
      console.log(err);
      message.success(err?.data?.message || "Error");
    }
  };
  return (
    <Modal open={open} onOk={onOk} onCancel={onClose}>
      <Typography.Text>Name</Typography.Text>
      <Input
        placeholder="Input name's category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};

const ModalCreate = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const onOk = async () => {
    try {
      await ApiStyles.create({ name });
      setName("");
      message.success("Success");
      onClose();
    } catch (err) {
      message.success(err?.data?.message || "Error");
    }
  };
  return (
    <Modal open={open} onOk={onOk} onCancel={onClose}>
      <Typography.Text>Name</Typography.Text>
      <Input
        placeholder="Input name's category"
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};
