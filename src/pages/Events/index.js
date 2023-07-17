import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Input,
  DatePicker,
  Button,
  message,
  Spin,
  Switch,
  Typography,
} from "antd";
import EventApi from "api/events";
import moment from "moment";
import UploadInput from "components/UpLoad/index";
import { uploadImage } from "api/upload";
import "./index.scss";
import CountdownTimer from "components/CountTimer";

export default function Events() {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await EventApi.getEvents();
      setEvent(res);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const beforeUpload = (e) => {
    uploadImage(e)
      .then((res) => {
        setEvent({ ...event, bannerImageUrl: res });
      })
      .catch((err) => {
        setEvent({ ...event, bannerImageUrl: "" });
        message.error("Failed to upload image");
      });
  };
  const onChangeUrl = (e) => {
    setEvent({ ...event, bannerImageUrl: e });
  };
  const onChangeDate = (date, dateString) => {
    setEvent({ ...event, expriredAt: dateString });
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  const handleUpdate = async () => {
    try {
      const res = await EventApi.update(event);
      message.success("Updated event");
    } catch (error) {
      message.error("Update failed");
    }
  };
  const updateActive = async (e) => {
    try {
      setLoading(true);
      await EventApi.update({ ...event, active: e });
      message.success("Updated");
    } catch (err) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="events layout-content">
      {" "}
      <Spin spinning={loading}>
        {event?.active && (
          <Row gutter={[24, 24]}>
            <Col span={24} className="mb-24">
              <Card
                className="header-solid h-full"
                bordered={false}
                title={[<h6 className="font-semibold m-0">Events Details</h6>]}
                bodyStyle={{ paddingTop: "0" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Col span={12}>
                    <Card
                      className="header-solid h-full event-details"
                      bordered={true}
                      bodyStyle={{ paddingTop: "0" }}
                      style={{
                        height: "400px",
                        backgroundImage: `url(${event.bannerImageUrl})`,
                      }}
                    >
                      <CountdownTimer targetDate={event.expriredAt} />
                      <div style={{ position: "relative", top: "40%" }}>
                        <Card>
                          <div className="event-item">
                            <div className="event-name">
                              {event.description}
                            </div>
                            <div className="event-description"></div>
                          </div>
                        </Card>
                      </div>
                    </Card>
                  </Col>
                </div>
              </Card>
            </Col>
          </Row>
        )}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Row align={"middle"}>
                <Typography.Text strong style={{ margin: "0px 10px" }}>
                  {" "}
                  Active Sale
                </Typography.Text>
                <Switch
                  loading={loading}
                  disabled={loading}
                  checked={event?.active}
                  onChange={(checked) => {
                    setEvent({ ...event, active: checked });
                    updateActive(checked);
                  }}
                />
              </Row>
              <Button onClick={() => handleUpdate()} type="primary">
                Update
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <Card
              className="header-solid h-full"
              bordered={false}
              title={[<h6 className="font-semibold m-0">Events Form</h6>]}
              bodyStyle={{ paddingTop: "0" }}
            >
              <div>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <div className="input">
                      <label>Name</label>
                      <Input
                        value={event.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setEvent({ ...event, name: value });
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="input">
                      <label>Description</label>
                      <Input.TextArea
                        value={event.description}
                        rows={5}
                        onChange={(e) => {
                          const value = e.target.value;
                          setEvent({ ...event, description: value });
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <UploadInput
                      data={event.bannerImageUrl}
                      setData={(e) => onChangeUrl(e)}
                      uploadFile={beforeUpload}
                    />
                  </Col>
                  <Col span={12}>
                    <div className="input">
                      <label>Exprired</label>
                      <DatePicker
                        value={moment(event.expriredAt, dateFormat)}
                        onChange={onChangeDate}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        //   disabledTime={disabledDateTime}
                        showTime={{
                          defaultValue: moment("00:00:00", "HH:mm:ss"),
                        }}
                        placeholder="Select event end date"
                      />
                    </div>
                  </Col>
                  {/* <Col span={12}>
                  <div className="input">
                    <label>Active</label>
                    <Switch
                      checked={event.active}
                      onChange={(e) => {
                        setEvent({ ...event, active: e });
                      }}
                    />
                  </div>
                </Col> */}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}
