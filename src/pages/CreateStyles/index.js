import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Collapse,
  Button,
  Input,
  message,
  Select,
  Descriptions,
  Empty,
  Modal,
  Popconfirm,
  Image,
} from "antd";
import { useHistory } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import ApiStyle from "api/styles";
import { uploadImage } from "api/upload";
import UploadInput from "components/UpLoad/index";
import "./index.scss";
import ModalExamples from "components/DetailsStyles/ModalExamples";
import ImageType from "components/ImageType";
const { Panel } = Collapse;
const deletebtn = [
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
      fill="#111827"
      className="fill-danger"
    ></path>
  </svg>,
];
const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];

const isNumber = (e) => {
  if (e.key.match(/[^0-9.]/g)) {
    e.preventDefault();
  } else if (e.target.value.indexOf(".") !== -1 && e.key === ".") {
    // If there is already a dot and the user types another dot, prevent it
    e.preventDefault();
  } else if (e.target.value.split(".").length > 1 && e.key === ".") {
    // If there is already one dot and the user types another digit after the dot, allow it
    return true;
  } else if (
    e.target.value.split(".").length > 1 &&
    e.target.value.split(".")[1].length === 2
  ) {
    // Only allow two decimal places
    e.preventDefault();
  } else {
    return true;
  }
};
export default function CreateStyles() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(true);
  const [dataEdit, setDataEdit] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [indexExample, setIndexExample] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [isAddStyle, setIsAddStyle] = useState(false);
  const [addStyle, setAddStyle] = useState({});
  useEffect(() => {
    // getDataById(id);
    setDataEdit({
      branch: "sd15",
      styles: [],
    });
  }, []);
  const submitData = async () => {
    setLoadingButton(true);
    try {
      const tempEdit = { ...dataEdit };
      const res = await ApiStyle.created(tempEdit);
      message.success("Successfully created");
      if (res) {
        setLoadingButton(false);
        history.push({
          pathname: `/styles/${res._id}`,
          params: { id: res._id },
        });
      }

      setData({ ...dataEdit });
    } catch (error) {
      message.error("Failed to  create");
      setLoadingButton(false);
    }
  };
  const titileCustom = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6 className="font-semibold m-0">Create Styles</h6>
        {isEdit ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              loading={loadingButton}
              onClick={() => submitData()}
              type="primary"
            >
              Created
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                setDataEdit({ ...data });
                setIsEdit(true);
              }}
              type="warning"
              icon={<EditOutlined />}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    );
  };
  const titleHeaderPane = (title, index) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h6 className="font-semibold m-0">Name: {title.toUpperCase()}</h6>
        <div className="col-action">
          <Button
            onClick={() => {
              // eslint-disable-next-line no-use-before-define
              const tempData = { ...dataEdit };
              setIndexExample(index);
              setIsAddStyle(true);
            }}
            type="link"
            className="darkbtn"
          >
            {pencil} Edit Name
          </Button>
        </div>
      </div>
    );
  };
  const onChangeUrl = (e) => {
    const tempData = { ...dataEdit };
    tempData.example_default = e;
    setDataEdit(tempData);
  };
  const onChangeInput = (e, field) => {
    const value = e.target.value;
    const tempData = { ...dataEdit };
    tempData[field] = value;
    setDataEdit(tempData);
  };
  const beforeUpload = (event) => {
    uploadImage(event)
      .then((res) => {
        setDataEdit({ ...dataEdit, example_default: res });
      })
      .catch((err) => {
        setDataEdit({ ...dataEdit, example_default: "" });
        message.error("Failed to upload image");
      });
  };
  return (
    <div className="layout-styles">
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title={titileCustom()}
          >
            <Row gutter={[24, 24]} style={{ padding: 24 }}>
              <Col span={24}>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <div className="input">
                      <label className="">Name</label>
                      <Input
                        value={dataEdit.name}
                        onChange={(e) => onChangeInput(e, "name")}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="input">
                      <label className="">Description</label>
                      <Input.TextArea
                        value={dataEdit.description}
                        rows={5}
                        onChange={(e) => onChangeInput(e, "description")}
                      />
                    </div>
                  </Col>
                  {/* <Col span={12}>
                    <div className="input">
                      <label className="">Base tune id</label>
                      <Select
                        style={{ width: "100%" }}
                        value={dataEdit.base_tune_id}
                        onChange={(e) => {
                          const temp = { ...dataEdit };
                          temp.base_tune_id = e;
                          setDataEdit(temp);
                        }}
                      >
                        {ApiStyle.baseType.map((item) => {
                          return (
                            <Select.Option key={item.value} value={item.value}>
                              {item.label}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="input">
                      <label className="">Model</label>
                      <Select
                        style={{ width: "100%" }}
                        value={dataEdit.branch}
                        onChange={(e) => {
                          const temp = { ...dataEdit };
                          temp.branch = e;
                          setDataEdit(temp);
                        }}
                      >
                        {ApiStyle.modelType.map((item) => {
                          return (
                            <Select.Option key={item.value} value={item.value}>
                              {item.label}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                  </Col> */}
                  <Col span={12}>
                    <div className="input">
                      <label className="">Option</label>
                      <Select
                        style={{ width: "100%" }}
                        value={dataEdit.type}
                        onChange={(e) => {
                          const temp = { ...dataEdit };
                          temp.type = e;
                          setDataEdit(temp);
                        }}
                      >
                        {ApiStyle.promtSelect.map((item) => {
                          return (
                            <Select.Option key={item.value} value={item.value}>
                              {item.label}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Col span={24} md={24} className="mb-24">
              <Card
                className="header-solid h-full"
                bordered={false}
                title={[
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h6 className="font-semibold m-0">Styles</h6>
                    <Button
                      onClick={() => {
                        const tempData = { ...dataEdit };
                        const imageLength = tempData?.styles?.length;
                        if (imageLength > 0) {
                          setIndexExample(imageLength);
                        } else {
                          setIndexExample(0);
                        }
                        setAddStyle({
                          name: "",
                          attributes: {},
                          description: "",
                        });
                        setIsAddStyle(true);
                      }}
                      type="primary"
                    >
                      Add style
                    </Button>
                  </div>,
                ]}
                bodyStyle={{ paddingTop: "0" }}
              >
                <Col span={24}>
                  {dataEdit?.styles && dataEdit?.styles.length > 0 ? (
                    <Collapse collapsible="icon">
                      {dataEdit?.styles?.map((item, index) => (
                        <Panel
                          header={titleHeaderPane(item.name, index)}
                          key={index}
                        >
                          <Col span={24}>
                            <Card
                              className="card-billing-info"
                              bordered="false"
                            >
                              <div className="col-info">
                                <Descriptions>
                                  <Descriptions.Item
                                    label="Base tune id"
                                    span={3}
                                  >
                                    {item?.attributes?.metadata?.base_tune_id}
                                  </Descriptions.Item>

                                  <Descriptions.Item label="Text" span={3}>
                                    {item?.attributes?.metadata?.text}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Ar" span={3}>
                                    {item?.attributes?.metadata?.ar}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Face Correct"
                                    span={3}
                                  >
                                    {item?.attributes?.metadata?.face_correct
                                      ? "TRUE"
                                      : "FALSE"}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Super Resolution"
                                    span={3}
                                  >
                                    {item?.attributes?.metadata
                                      ?.super_resolution
                                      ? " TRUE"
                                      : "FALSE"}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Denoising Strength"
                                    span={3}
                                  >
                                    {
                                      item?.attributes?.metadata?.img2Img
                                        ?.denoising_strength
                                    }
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Controlnet Conditioning Scale"
                                    span={3}
                                  >
                                    {
                                      item?.attributes?.metadata?.img2Img
                                        ?.controlnet_conditioning_scale
                                    }
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Controlnet"
                                    span={3}
                                  >
                                    {
                                      item?.attributes?.metadata?.img2Img
                                        ?.controlnet
                                    }
                                  </Descriptions.Item>
                                </Descriptions>
                              </div>
                              <div className="col-info">
                                <Descriptions>
                                  <Descriptions.Item label="Model" span={3}>
                                    {
                                      ApiStyle.convertModel[
                                        `${item?.attributes?.metadata?.branch}`
                                      ]
                                    }
                                  </Descriptions.Item>

                                  <Descriptions.Item label="Step" span={3}>
                                    {item?.attributes?.metadata?.steps ||
                                      "Null"}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Seed" span={3}>
                                    {item?.attributes?.metadata?.seed || "Null"}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Number Images"
                                    span={3}
                                  >
                                    {item?.attributes?.metadata?.num_images ||
                                      "Null"}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Cfg Scale" span={3}>
                                    {item?.attributes?.metadata?.cfg_scale ||
                                      "Null"}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Description"
                                    span={3}
                                  >
                                    {item?.description}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Image 2 Image"
                                    span={3}
                                  >
                                    <Image
                                      src={
                                        item?.attributes?.metadata?.img2Img
                                          ?.input_image_url
                                      }
                                      fallback="data:image/png;base64,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"
                                    />
                                  </Descriptions.Item>
                                </Descriptions>
                              </div>
                              <div className="col-action">
                                <Popconfirm
                                  title="Are you sure to delete this style?"
                                  onConfirm={async () => {
                                    const tempData = { ...dataEdit };
                                    tempData.styles.splice(index, 1);
                                    try {
                                      setDataEdit(tempData);
                                      message.success("Successfully updated");
                                    } catch (error) {
                                      message.error("Failed to update");
                                    }
                                  }}
                                  onCancel={() => {}}
                                >
                                  <Button type="link" danger>
                                    {deletebtn}DELETE
                                  </Button>
                                </Popconfirm>

                                <Button
                                  onClick={() => {
                                    setIsAdd(false);
                                    setIndexExample(index);
                                    setIsVisible(true);
                                  }}
                                  type="link"
                                  className="darkbtn"
                                >
                                  {pencil} EDIT
                                </Button>
                              </div>
                            </Card>
                          </Col>
                          <ImageType data={item?.attributes?.examples} />
                        </Panel>
                      ))}
                    </Collapse>
                  ) : (
                    <Col span={24} className="mb-24">
                      <Empty />
                    </Col>
                  )}
                </Col>
              </Card>
            </Col>
          </Card>
        </Col>
      </Row>
      {isEdit && isVisible ? (
        <ModalExamples
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          data={dataEdit}
          setData={setDataEdit}
          indexExample={indexExample}
          indexImage={indexImage}
          isAdd={isAdd}
          onCreated="create"
        />
      ) : (
        ""
      )}
      {isAddStyle ? (
        <Modal
          visible={isAddStyle}
          maskClosable={false}
          title={
            dataEdit?.styles[indexExample]?.name
              ? "Edit name style"
              : "Add name style"
          }
          onOk={() => {
            const temp = { ...dataEdit };
            if (dataEdit?.styles[indexExample]?.name) {
              temp.styles[indexExample] = addStyle;
              setDataEdit(temp);
              setIsAddStyle(false);
            } else {
              if (indexExample > 0) {
                temp.styles = [...temp.styles, addStyle];
              } else {
                temp.styles[indexExample] = addStyle;
              }
              setDataEdit(temp);
              setIsAddStyle(false);
              setIsAdd(true);
              setIsVisible(true);
            }
          }}
          onCancel={() => {
            setIsAddStyle(false);
          }}
        >
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="input">
                <label className="">Name</label>
                <Input
                  value={addStyle.name}
                  onChange={(e) => {
                    const temp = { ...addStyle };
                    const value = e.target.value;
                    setAddStyle({ ...temp, name: value });
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="input">
                <label className="">Description</label>
                <Input.TextArea
                  value={addStyle.description}
                  onChange={(e) => {
                    const temp = { ...addStyle };
                    const value = e.target.value;
                    setAddStyle({ ...temp, description: value });
                  }}
                  rows={3}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
