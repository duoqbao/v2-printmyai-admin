import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  message,
  Spin,
  Table,
  Checkbox,
  Select,
  Typography,
  Modal,
} from "antd";
import ApiSetting from "api/setting";
import ApiEvent from "api/events";
import "./index.scss";
import { useState } from "react";
import axios from "axios";
import ChangePassword from "./ChangePassword";
export default function Settings() {
  // const menu = [
  //   { value: "api", text: "API Key" },
  //   { value: "changePassword", text: "Change password" },
  // ];
  const [menu, setMenu] = useState([]);
  const [itemMenu, setItemMenu] = useState({});
  const [loading, setLoading] = useState(false);
  const [shopId, setShopId] = useState("");
  const [dataShops, setDataShops] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await ApiSetting.get3dServices();
      setMenu(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const getStore = async () => {
    setLoadingTable(true);
    try {
      const event = await ApiEvent.getEvents();
      setShopId(event.shopId);
      const store = await ApiEvent.getStores();
      setDataShops(store);
      setLoadingTable(false);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const updateKey = async () => {
    try {
      const res = await ApiSetting.update3dServices(
        itemMenu.sku,
        itemMenu.secretKey
      );
      message.success("Updated successfully");
      getData();
      if (itemMenu.sku === "printify") {
        getStore();
      }
      if (itemMenu.sku == "astria") {
        updateAstriaConfig();
      }
    } catch (error) {}
  };
  const handleUpdateSelectStore = async (item) => {
    try {
      const res = await ApiEvent.updateStore(item);
      setShopId(item);
    } catch (error) {}
  };
  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (item) => {
        return (
          <Checkbox
            checked={item === shopId}
            onChange={(e) => handleUpdateSelectStore(item)}
          />
        );
      },
    },
    {
      title: "Name Shope",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sales Changes",
      dataIndex: "sales_channel",
      key: "sales_channel",
    },
  ];

  ///
  const [tunes, setTunes] = useState([]);
  const branch = ["sd15", "sd21", "protogen34", "openjourney2"];
  const [astriaLoading, setAstriaLoading] = useState(false);
  const [astriaConfig, setAstriaConfig] = useState({
    base_tune_id: "",
    branch: "",
  });
  const getListTunes = async () => {
    setAstriaLoading(true);
    const data = await ApiSetting.getListTunes();
    setTunes(data);
    setAstriaConfig(menu.filter((i) => i.sku == "astria")[0]?.metadata);
    setAstriaLoading(false);
  };

  const updateAstriaConfig = async () => {
    const data = await ApiSetting.updateAstriaConfig({ ...astriaConfig });
  };
  useEffect(() => {
    if (itemMenu.sku == "astria") {
      getListTunes();
    }
  }, [itemMenu]);

  const [onChangePassword, setOnChangePassword] = useState(false);
  return (
    <div>
      <Modal
        open={onChangePassword}
        onCancel={() => {
          setOnChangePassword(false);
        }}
        footer={null}
      >
        <ChangePassword onClose={() => setOnChangePassword(false)} />
      </Modal>
      <Spin spinning={loading}>
        <Card
          bordered={false}
          className="criclebox tablespace mb-24 settings"
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title level={4}>Settings</Typography.Title>
              <Button onClick={() => setOnChangePassword(true)}>
                Change Password
              </Button>
            </div>
          }
        >
          <div style={{ padding: 12 }}>
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <ul className="menu-setting">
                  {menu.map((item, index) => {
                    return (
                      <li
                        className={`item ${
                          itemMenu._id === item._id ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => {
                          if (item.sku === "printify") {
                            getStore();
                          }
                          setItemMenu(item);
                        }}
                      >
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <Col span={16}>
                <Row hidden={!itemMenu._id}>
                  <Col span={24}>
                    <div style={{ padding: " 0 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: 24,
                        }}
                      >
                        <Button type="primary" onClick={() => updateKey()}>
                          Update
                        </Button>
                      </div>
                      {!["printify", "astria"].includes(itemMenu.sku) && (
                        <div className="input">
                          <label>Key : {itemMenu.name}</label>
                          <Input.Password
                            value={itemMenu.secretKey}
                            onChange={(e) => {
                              const value = e.target.value;
                              setItemMenu({ ...itemMenu, secretKey: value });
                            }}
                          />
                        </div>
                      )}
                      <div
                        style={{ padding: 24 }}
                        hidden={itemMenu.sku !== "printify"}
                      >
                        <Table
                          columns={columns}
                          dataSource={dataShops}
                          pagination={false}
                          loading={loadingTable}
                        />
                      </div>

                      <div
                        style={{
                          padding: 24,
                        }}
                        hidden={itemMenu.sku !== "astria"}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {astriaLoading ? (
                            <Spin />
                          ) : (
                            <>
                              <div style={{ margin: 5 }}>
                                <Typography.Title level={5}>
                                  Base tune
                                </Typography.Title>
                                <Select
                                  onChange={(e) => {
                                    setAstriaConfig({
                                      ...astriaConfig,
                                      base_tune_id: e,
                                    });
                                  }}
                                  style={{ minWidth: 400 }}
                                  defaultValue={() =>
                                    `${
                                      tunes.filter(
                                        (i) =>
                                          i.id == astriaConfig?.base_tune_id
                                      )[0]?.title
                                    } - ${
                                      tunes.filter(
                                        (i) =>
                                          i.id == astriaConfig?.base_tune_id
                                      )[0]?.id
                                    }`
                                  }
                                >
                                  {tunes?.map((i) => (
                                    <Select.Option
                                      value={i.id}
                                      title={i.title}
                                      key={i.id}
                                    >
                                      {i.title} - {i.id}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </div>
                              <div style={{ margin: 5 }}>
                                <Typography.Title level={5}>
                                  Model
                                </Typography.Title>
                                <Select
                                  style={{ minWidth: 200 }}
                                  onChange={(e) => {
                                    setAstriaConfig({
                                      ...astriaConfig,
                                      branch: e,
                                    });
                                  }}
                                  value={astriaConfig?.branch}
                                >
                                  {branch?.map((i) => (
                                    <Select.Option value={i}>{i}</Select.Option>
                                  ))}
                                </Select>
                              </div>
                            </>
                          )}
                        </div>
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 20,
                          }}
                        >
                          <Button type="primary">Update Astria config</Button>
                        </div> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </Spin>
    </div>
  );
}
