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
export const ModalEdit = ({ open, onClose, item }) => {
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

export const ModalCreate = ({ open, onClose }) => {
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
