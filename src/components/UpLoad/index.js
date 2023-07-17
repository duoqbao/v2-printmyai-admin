import React, { useState, useEffect } from "react";
import { Upload, Row, Col, Input, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss"
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
export default function UploadInput(props) {
  const { data, setData, uploadFile, title = "Url", isInput = false } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getDataById(id);
    setLoading(false);
  }, [data]);
  const beforeUpload = (file) => {
    setLoading(true);
    uploadFile(file);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const onChangeUrl = (e) => {
    const url = e.target.value;
    setData(url);
  };
  return (
    <Row gutter={[24, 24]} className="UploadInput">
      <Col span={12} hidden={isInput}>
        <div className="input">
          <label>{title}</label>
          <Input value={data} onChange={(e) => onChangeUrl(e)} />
        </div>
      </Col>
      <Col span={isInput ? 24 : 12}>
        <Upload
          name="avatar"
          listType={data && isUrl(data) ? "text" : "picture-card"}
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          accept="image/*"
        >
          <Spin spinning={loading}>
            {data && isUrl(data) ? (
              <div
                className="card-credit img-hover"
                style={{
                  width: "20rem",
                  height: "11em",
                  backgroundImage: `url(${data})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  cursor: "pointer",
                }}
              />
            ) : (
              uploadButton
            )}
          </Spin>
        </Upload>
      </Col>
    </Row>
  );
}
