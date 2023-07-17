import React, { useState, useEffect } from "react";
import { Upload, Row, Col, message, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImage } from "api/upload";
import "./index.scss";
function isUrl(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
export default function UploadMultiple({ onChange }) {
  const [loading, setLoading] = useState(false);

  // const beforeUpload = (file) => {
  //   console.log(file);
  // };
  const beforeUpload = async (event) => {
    setLoading(true);
    let tmp = [];
    try {
      const data = await uploadImage(event);
      tmp.push(data);
    } catch (err) {
      message.error("Failed to upload image");
    } finally {
      setLoading(false);
      onChange(tmp);
    }
    console.log(tmp);
  };
  const uploadButton = (
    <Col
      align="middle"
      style={{
        border: "1px solid #eee",
        borderRadius: 10,
        width: 100,
        cursor: "pointer",
      }}
    >
      <PlusOutlined />
      <div style={{}}>Upload</div>
    </Col>
  );

  return (
    <Row gutter={[24, 24]} className="UploadInput">
      <Col span={12}>
        <Upload
          multiple
          maxCount={6}
          name="avatar"
          className="avatar-uploader"
          showUploadList={false}
          fileList
          accept="image/*"
        >
          <Spin spinning={loading}>{uploadButton}</Spin>
        </Upload>
      </Col>
    </Row>
  );
}
