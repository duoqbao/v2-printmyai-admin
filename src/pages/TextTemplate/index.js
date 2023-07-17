import React, { useEffect, useState } from "react";
import {
  Modal,
  Spin,
  Row,
  Col,
  Button,
  Card,
  message,
  Image,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UploadInput from "components/UpLoad";
import ApiText from "api/template";
import { uploadImage } from "api/upload";
import "./index.scss";
export default function TextTenplate() {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await ApiText.getList();
      setUrls(res);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const beforeUpload = async (file) => {
    uploadImage(file)
      .then((res) => {
        setUrl(res);
      })
      .catch((err) => {
        setUrl(null);
        message.error("Failed to upload image");
      });
  };
  const submitTemplate = async () => {
    try {
      const res = await ApiText.createTemplate(url);
      setIsVisible(false);
      setUrl('');
      message.success("Created successfully");
      getData();
    } catch (err) {}
  };
  return (
    <Spin spinning={loading}>
      <div className="layout-styles textTemplate">
        <Card title="Text Template">
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <Button
                  onClick={() => {
                    setIsVisible(true);
                  }}
                  type="primary"
                >
                  Create Template
                </Button>
              </div>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 12]}>
                {urls.map((item, index) => {
                  return (
                    <Col lg={6} xxl={3} xs={24}  key={index}>
                      <div className="image-item">
                        <Image
                          style={{ width: 180, height: 180, borderRadius: 8 }}
                          src={item.url}
                          alt={item.createdAt}
                        />
                        <Popconfirm
                          title="Are you sure delete this template?"
                          onConfirm={async () => {
                            try {
                              const res = await ApiText.delete(item._id);
                              message.success("Deleted successfully");
                              getData();
                            } catch (error) {}
                          }}
                          onCancel={() => {}}
                        >
                          <Button type="link" className="image-icon"  icon={<DeleteOutlined />} danger/>
                        </Popconfirm>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      <Modal
        title="Upload"
        visible={isVisible}
        onCancel={() => {
          setUrl('');
          setIsVisible(false);
        }}
        onOk={submitTemplate}
        width={600}
      >
        <Row gutter={[12,12]}>
          <Col span={24}>
            <UploadInput
              data={url}
              setData={(e) => setUrl(e)}
              uploadFile={beforeUpload}
            />
          </Col>
        </Row>
      </Modal>
    </Spin>
  );
}
