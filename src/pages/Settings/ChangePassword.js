import React from "react";
import { Form, Input, Button, message } from "antd";
import API from "../../api/index";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
export default function ChangePassword({ onClose }) {
  const [form] = Form.useForm();

  const onFinish = async (e) => {
    try {
      await API.post("/auth/change-password", { ...e });
      message.success("Success!");
      onClose();
    } catch (err) {
      message.error(JSON.stringify(err.response?.data?.message));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Form
        form={form}
        {...formItemLayout}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="old_password"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button htmlType="submit" type="primary">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
