import React, { useEffect } from "react";
import { Layout, Button, Card, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../store/modules/auth";
import { Redirect } from "react-router-dom";
import { clearMessage } from "../store/modules/message";
// import logo from "assets/images/settings.png"
const { Content, Header } = Layout;
const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onFinish = async (values) => {
    const { email, password } = values;
    dispatch(adminLogin({ email, password }));
  };

  const onFinishFailed = (errorInfo) => {};
  if (isLoggedIn) {
    return <Redirect to="/styles" />;
  }
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            {/* <img src={logo} style={{ width: "200px" }} />  */}
          </div>
          <div className="header-col header-nav"></div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content"></div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Admin Manager</h5>}
            bordered="false"
          >
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="User name"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email@.com" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={loading}
                  type="success"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </div>
    </>
  );
};
export default SignIn;
