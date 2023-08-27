import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Input,
  message,
  Popconfirm,
} from "antd";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import Categories from "api/category";
import { useHistory } from "react-router-dom";
export default function Category() {
  const history = useHistory();
  const [modal, contextHolder] = Modal.useModal();

  const [data, setData] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [itemEdit, setItemEdit] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      width: "20%",
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button
              icon={<EditFilled />}
              onClick={() => {
                setNameCategory(item?.name);
                setItemEdit(item);
                setIsVisible(true);
              }}
              type="warring"
            >
              Edit
            </Button>
            <Popconfirm
              title="Are You Sure?"
              onConfirm={() => deleteCategory(item._id)}
              onCancel={() => {}}
            >
              <Button icon={<DeleteFilled />} type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
    {
      width: "20%",
      key: "product",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => {
                history.push(`/category/${item._id}/products`);
              }}
            >
              Show product by Category
            </Button>
          </div>
        );
      },
    },
  ];
  const getData = async () => {
    try {
      setLoading(true);
      const res = await Categories.getlist();
      setData(res || []);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    document.title = "Category";
    getData();
  }, []);
  const deleteCategory = async (id) => {
    const res = await Categories.deleteForce(id);
    message.success("Delete Success");
    getData();
    // try {
    //   const res = await Categories.delete(id);
    //   message.success("Delete Success");
    //   getData();
    // } catch (error) {
    //   const temp = error?.response?.data?.stack.split("\n");
    //   Modal.confirm({
    //     title: "Are you sure you want to delete ?",
    //     content: temp[0],
    //     onOk: async () => {
    //       const res = await Categories.deleteForce(id);
    //       message.success("Delete Success");
    //       getData();
    //     },
    //     onCancel: async () => {},
    //   });
    // }
  };
  const createName = async () => {
    try {
      const body = {
        name: nameCategory,
      };
      if (itemEdit._id) {
        const res = await Categories.update(itemEdit._id, body);
        message.success("Updated successfully");
      } else {
        const res = await Categories.create(body);
        message.success("Created successfully");
      }
      CloseModal();
      getData();
    } catch (error) {
      message.error("Failed");
    }
  };
  const CloseModal = () => {
    setItemEdit({});
    setNameCategory("");
    setIsVisible(false);
  };
  return (
    <div className="layout-styles">
      <Row gutter={[24, 24]}>
        <Col xs="24" xl={24}>
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
                  setIsVisible(true);
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
                dataSource={data}
                pagination={false}
                className="ant-border-space"
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        title={itemEdit._id ? "Edit Name" : "Create Name"}
        visible={isVisible}
        onOk={() => createName()}
        onCancel={() => CloseModal()}
        okText={itemEdit._id ? "Save" : "Create"}
      >
        <div>
          <Row>
            <Col span={12}>
              <div className="input">Name</div>
              <Input
                value={nameCategory}
                onChange={(e) => {
                  setNameCategory(e.target.value);
                }}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}
