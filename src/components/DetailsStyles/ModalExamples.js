import {
  Modal,
  Row,
  Col,
  Select,
  Card,
  Button,
  Input,
  Switch,
  Popconfirm,
  message,
  Collapse,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import ApiStyle from "api/styles";

import { uploadImage } from "api/upload";
import { useParams } from "react-router-dom";
import UploadInput from "components/UpLoad/index";
import "./ModalExamples.scss";
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
const conTrolnet = [
  {
    value: "None",
    label: "",
  },
  {
    value: "canny",
    label: "Canny",
  },
  {
    value: "depth",
    label: "Depth",
  },
  {
    value: "mlsd",
    label: "Mlsd",
  },
  {
    value: "hed",
    label: "Hed",
  },
];
function removeEmptyFields(obj) {
  for (let prop in obj) {
    if (obj[prop] === null || obj[prop] === "" || obj[prop] === undefined) {
      delete obj[prop];
    }
  }
  return obj;
}
export default function ModalExamples(props) {
  const {
    isVisible,
    data,
    indexExample,
    setData,
    setIsVisible,
    indexImage,
    isAdd = true,
    onCreated = "create",
    trigger,
    setTrigger,
  } = props;
  const { id } = useParams();
  const [examples, setExamples] = useState({});
  const [item, setItem] = useState({});
  const types = [
    { label: "Man", value: "man" },
    { label: "Female", value: "female" },
    { label: "Couple", value: "couple" },
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
  ];
  const ars = ["1:1", "portrait", "16:9", "landscape", "anamorphic"];
  useEffect(() => {
    const temp = { ...data.styles[indexExample] };
    const singel = {
      metadata: {
        negative_prompt: "",
        text: "",
        face_correct: false,
        ar: "1:1",
        num_images: 8,
        super_resolution: false,
        steps: null,
        cfg_scale: null,
        seed: null,
        img2Img: {
          input_image_url: "",
          denoising_strength: "",
          controlnet_conditioning_scale: "",
          controlnet: "",
        },
        width: 512,
        height: 512,
      },
      examples: [
        {
          type: "female",
          urls: ["", ""],
        },
        {
          type: "man",
          urls: ["", ""],
        },
        {
          type: "couple",
          urls: ["", ""],
        },
        {
          type: "cat",
          urls: ["", ""],
        },
        {
          type: "dog",
          urls: ["", ""],
        },
      ],
    };
    if (isAdd) {
      temp.attributes = { ...singel };
      setItem(singel);
    } else {
      setItem(data?.styles[indexExample].attributes);
    }
    setExamples(temp);
  }, [isVisible, data, indexExample, isAdd]);

  const onChangeInput = (e, index, field) => {
    const name = e.target.value;
    const temp = { ...examples };
    if (field === "seed" || field === "steps" || field === "cfg_scale") {
      temp.attributes.metadata[field] = Number(name);
    } else {
      temp.attributes.metadata[field] = name;
    }
    setExamples(temp);
    const itemInput = { ...item };
    itemInput.metadata[field] = name;
    setItem({ ...itemInput });
  };
  const onChangeSelect = (e, index, field) => {
    const name = e;
    const temp = { ...examples };
    temp.attributes.metadata[field] = name;
    setExamples(temp);
    const itemInput = { ...item };
    itemInput.metadata[field] = name;
    setItem({ ...itemInput });
  };
  const onChangeSwitch = (e, index, field) => {
    const temp = { ...examples };
    temp.attributes.metadata[field] = e;
    setExamples(temp);
    const itemInput = { ...item };
    itemInput.metadata[field] = e;
    setItem({ ...itemInput });
  };
  const onSaveExmales = async () => {
    const tempData = { ...data };
    const temp = { ...examples };
    temp.attributes.metadata = removeEmptyFields(temp?.attributes?.metadata);
    temp.attributes.metadata.img2Img = removeEmptyFields(
      temp?.attributes?.metadata?.img2Img
    );
    tempData.styles[indexExample] = temp;
    if (onCreated === "create") {
      setData(tempData);
      setIsVisible(false);
      return;
    }
    try {
      const res = await ApiStyle.update(tempData, id);
      message.success("Successfully updated");
      setData(tempData);
      setIsVisible(false);
      setTrigger(!trigger);
    } catch (error) {
      message.error("Failed to update");
    }
  };
  const removeImageItem = async () => {
    const tempData = { ...data };
    tempData.styles.splice(indexExample, 1);
    if (onCreated === "create") {
      setData(tempData);
      setIsVisible(false);
      return;
    }
    try {
      const res = await ApiStyle.update(tempData, id);
      message.success("Successfully updated");
      // setData(tempData);
      setIsVisible(false);
      setTrigger(!trigger);
    } catch (error) {
      message.error("Failed to update");
    }
  };
  const onChangeUrl = (value, index) => {
    const temp = { ...examples };
    temp.images[index].url_sample = value;
    setExamples(temp);
    const itemInput = { ...item };
    setItem({ ...itemInput, url_sample: value });
  };
  const beforeUpload = (event, index) => {
    uploadImage(event)
      .then((res) => {
        onChangeUrl(res, index);
      })
      .catch((err) => {
        onChangeUrl("", index);
        message.error("Failed to upload image");
      });
  };
  return (
    <div>
      <Modal
        className="examples"
        maskClosable={false}
        visible={isVisible}
        title={isAdd ? "Add Styles" : "Details Style"}
        onCancel={() => {
          setIsVisible(false);
          setItem({});
        }}
        width={900}
        onOk={onSaveExmales}
      >
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              {!isAdd ? (
                <Col span={24}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Popconfirm
                      title="Are you sure to delete this style?"
                      onConfirm={() => {
                        removeImageItem();
                      }}
                      onCancel={() => {}}
                    >
                      <Button danger>Remove</Button>
                    </Popconfirm>
                  </div>
                </Col>
              ) : null}
            </Row>

            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Card
                  className="header-solid h-full"
                  bordered={false}
                  title={[<h6 className="font-semibold m-0">Images</h6>]}
                  bodyStyle={{ paddingTop: "0" }}
                >
                  <Row gutter={[24, 24]}>
                    <Col span={12}>
                      <div className="input">
                        <label className="">Ar</label>
                        <Select
                          value={item?.metadata?.ar}
                          onChange={(e) => onChangeSwitch(e, indexImage, "ar")}
                        >
                          {ars.map((item) => {
                            return (
                              <Select.Option key={item} value={item}>
                                {item}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label className="">Text Prompt</label>
                        <Input.TextArea
                          value={item?.metadata?.text}
                          rows={5}
                          onChange={(e) => onChangeInput(e, indexImage, "text")}
                        />
                      </div>
                    </Col>

                    <Col span={12}>
                      <div className="input">
                        <label>Negative</label>
                        <Input
                          value={item?.metadata?.negative_prompt}
                          onChange={(e) =>
                            onChangeInput(e, indexImage, "negative_prompt")
                          }
                        />
                      </div>
                    </Col>
                    {/* <Col span={12}>
                      <div className="input">
                        <label className="">Model</label>
                        <Select
                          style={{ width: "100%" }}
                          value={item?.metadata?.branch}
                          onChange={(e) => {
                            onChangeSelect(e, indexImage, "branch");
                          }}
                        >
                          {ApiStyle.modelType.map((item) => {
                            return (
                              <Select.Option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col> */}

                    <Col span={12}>
                      <div className="input">
                        <label className="">Step</label>
                        <Input
                          value={item?.metadata?.steps}
                          onChange={(e) =>
                            onChangeInput(e, indexImage, "steps")
                          }
                          onKeyPress={isNumber}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label className="">Seed</label>
                        <Input
                          value={item?.metadata?.seed}
                          rows={5}
                          onChange={(e) => onChangeInput(e, indexImage, "seed")}
                          onKeyPress={isNumber}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label className="">Cfg Scale</label>
                        <Input
                          value={item?.metadata?.cfg_scale}
                          rows={5}
                          onChange={(e) =>
                            onChangeInput(e, indexImage, "cfg_scale")
                          }
                          onKeyPress={isNumber}
                        />
                      </div>
                    </Col>
                    <Col span={12} className="mb-24">
                      <div className="input">
                        <label>Number Images</label>
                        <Select
                          value={item?.metadata?.num_images}
                          onChange={(e) =>
                            onChangeSelect(e, indexImage, "num_images")
                          }
                        >
                          <Select.Option value={4}>4</Select.Option>
                          <Select.Option value={8}>8</Select.Option>
                        </Select>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[24, 24]} className="mb-24">
                    <Col span={12}>
                      <div className="input">
                        <label className="">Width</label>
                        <Input
                          value={item?.metadata?.width}
                          defaultValue={item?.metadata?.width || 512}
                          rows={5}
                          onChange={(e) =>
                            onChangeInput(e, indexImage, "width")
                          }
                          onKeyPress={isNumber}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label className="">Height</label>
                        <Input
                          value={item?.metadata?.height}
                          rows={5}
                          defaultValue={item?.metadata?.height || 512}
                          onChange={(e) =>
                            onChangeInput(e, indexImage, "height")
                          }
                          onKeyPress={isNumber}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={[24, 24]} className="mb-24">
                    <Col span={12}>
                      <div className="input">
                        <label>Face Correct</label>
                        <Switch
                          style={{ width: "10%" }}
                          checked={item?.metadata?.face_correct}
                          onChange={(e) =>
                            onChangeSwitch(e, indexImage, "face_correct")
                          }
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label>Super Resolution</label>
                        <Switch
                          style={{ width: "10%" }}
                          checked={item?.metadata?.super_resolution}
                          onChange={(e) =>
                            onChangeSwitch(e, indexImage, "super_resolution")
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[12, 12]} className="mb-24">
                    {item?.examples?.map((i, index) => {
                      return (
                        <Col span={24}>
                          <Row>
                            <Col>
                              <h2>{i.type.toUpperCase()}</h2>
                            </Col>
                          </Row>
                          <Row gutter={[24, 24]} className="mb-24">
                            {/* <h2>{i.type.toUpperCase()}</h2> */}
                            <Col span={12}>
                              <UploadInput
                                data={i?.urls[0]}
                                setData={(e) => {
                                  const temp = { ...item };
                                  temp.examples[index].urls[0] = e;
                                  setItem({ ...temp });
                                }}
                                isInput={true}
                                uploadFile={(e) => {
                                  uploadImage(e)
                                    .then((res) => {
                                      const temp = { ...item };
                                      temp.examples[index].urls[0] = res;
                                      setItem({ ...temp });
                                    })
                                    .catch((err) => {
                                      const temp = { ...item };
                                      temp.examples[index].urls[0] = "";
                                      setItem({ ...temp });
                                      message.error("Failed to upload image");
                                    });
                                }}
                              />
                            </Col>
                            <Col span={12}>
                              <UploadInput
                                data={i?.urls[1]}
                                isInput={true}
                                setData={(e) => {
                                  const temp = { ...item };
                                  temp.examples[index].urls[1] = e;
                                  setItem({ ...temp });
                                }}
                                uploadFile={(e) => {
                                  uploadImage(e)
                                    .then((res) => {
                                      const temp = { ...item };
                                      temp.examples[index].urls[1] = res;
                                      setItem({ ...temp });
                                    })
                                    .catch((err) => {
                                      const temp = { ...item };
                                      temp.examples[index].urls[1] = "";
                                      setItem({ ...temp });
                                      message.error("Failed to upload image");
                                    });
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </Row>
                  <Divider />
                  <Row>
                    <h2 style={{ fontWeight: 600 }}>Image 2 Image</h2>
                  </Row>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <UploadInput
                        title="Input image url"
                        isInput={false}
                        data={item?.metadata?.img2Img?.input_image_url}
                        setData={(e) => {
                          const temp = { ...item };
                          temp.metadata.img2Img.input_image_url = e;
                          setItem({ ...temp });
                        }}
                        uploadFile={(e) => {
                          uploadImage(e)
                            .then((res) => {
                              const temp = { ...item };
                              temp.metadata.img2Img.input_image_url = res;
                              setItem({ ...temp });
                            })
                            .catch((err) => {
                              const temp = { ...item };
                              temp.metadata.img2Img.input_image_url = "";
                              setItem({ ...temp });
                              message.error("Failed to upload image");
                            });
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label>Denoising Strength</label>
                        <Input
                          value={item?.metadata?.img2Img?.denoising_strength}
                          onKeyPress={isNumber}
                          onChange={(e) => {
                            const temp = { ...item };
                            temp.metadata.img2Img.denoising_strength =
                              e.target.value;
                            setItem({ ...temp });
                          }}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="input">
                        <label>Controlnet Conditioning Scale</label>
                        <Input
                          value={
                            item?.metadata?.img2Img
                              ?.controlnet_conditioning_scale
                          }
                          onKeyPress={isNumber}
                          onChange={(e) => {
                            const temp = { ...item };
                            temp.metadata.img2Img.controlnet_conditioning_scale =
                              e.target.value;
                            setItem({ ...temp });
                          }}
                        />
                      </div>
                    </Col>
                    <Col span={24}>
                      <div className="input">
                        <label>Controlnet</label>
                        <Select
                          value={item?.metadata?.img2Img?.controlnet}
                          onChange={(e) => {
                            const temp = { ...item };
                            temp.metadata.img2Img.controlnet = e;
                            setItem({ ...temp });
                          }}
                        >
                          {conTrolnet.map((i) => {
                            return (
                              <Select.Option value={i.value}>
                                {i.label}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
