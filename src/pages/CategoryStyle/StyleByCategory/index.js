import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Typography,
  Image,
  Upload,
  Spin,
  message,
  Card,
  Popconfirm,
} from "antd";
import { API_URL } from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../api/styles";
import { uploadImage } from "../../../api/upload";
export default function StyleByCategory() {
  const { categoryId } = useParams();
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [category, setCategory] = useState({ name: "Category" });
  useEffect(() => {
    if (categoryId)
      (async () => {
        const { data, category } = await Api.getStyleByCategoryId(categoryId);
        setCategory(category);
        setData(data);
      })();
  }, [categoryId, refetch]);
  const [open, setOpen] = useState(false);
  const onDelete = async (id) => {
    await Api.delete(id);
    setData((prev) => prev.filter((i) => i._id != id));
    message.success("Deleted");
  };

  return (
    <div>
      <Row justify="space-between" align={"middle"}>
        <Typography.Text strong> {category.name}</Typography.Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </Row>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {data.map((item) => (
          <Style
            name={item.name}
            premium={item.premium}
            image={item?.femaleExamples[0] || item?.maleExamples[0]}
            onDelete={() => onDelete(item._id)}
            key={item._id}
            item={item}
            afterEdit={() => setRefetch((prev) => !prev)}
          />
        ))}
      </div>
      <AddModal
        open={open}
        onClose={(e) => {
          setOpen(false);
          if (e?._id) {
            setData([...data, e]);
          }
        }}
      />
    </div>
  );
}

const AddModal = ({ open, onClose }) => {
  const { categoryId } = useParams();
  const [state, setState] = useState({
    name: "",
    premium: false,
    credit: 1,
    femalePrompt: "",
    femaleExamples: [],
    malePrompt: "",
    maleExamples: [],
    negative: "",
    model: "",
    sampler: "",
    clipSkip: 0,
    step: 30,
    hiRes: false,
    hiResStep: 20,
    upscaler: "",
    upscaledBy: 2,
    denoisingStrength: 0.45,
    width: 512,
    height: 768,
    numberOfImage: 2,
    seed: -1,
    configScale: 7,
  });
  const [loading, setLoading] = useState(false);
  const onOk = async () => {
    try {
      setLoading(true);
      const data = await Api.createStyleByCategoryId(categoryId, state);
      onClose(data);
    } catch (err) {
      message.error(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      onOk={onOk}
      confirmLoading={loading}
      open={open}
      onCancel={onClose}
      title="Adding Style"
      width={"100%"}
      closable
      maskClosable={false}
    >
      <Row justify={"end"} align="middle">
        <Row align={"middle"}>
          <Typography.Text strong style={{ padding: `0px 5px` }}>
            Premium{" "}
          </Typography.Text>
          <Switch
            checked={state.premium}
            onChange={(e) => setState({ ...state, premium: e })}
          />
        </Row>

        <Row align={"middle"} style={{ margin: `0px 20px` }}>
          <Typography.Text strong style={{ padding: `0px 5px` }}>
            Credit{" "}
          </Typography.Text>
          <Input
            style={{ maxWidth: 50 }}
            value={state.credit}
            type={"number"}
            min={0}
            onChange={(e) => setState({ ...state, credit: e.target.value })}
          />
        </Row>
      </Row>

      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Name</Typography.Text>
        <Input
          placeholder="Input style's name"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          value={state.name}
        />
      </Col>

      {/* ? */}
      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Female prompt</Typography.Text>
        <Input
          placeholder="Input female prompt text"
          onChange={(e) => setState({ ...state, femalePrompt: e.target.value })}
          value={state.femalePrompt}
        />
      </Col>

      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Male prompt</Typography.Text>
        <Input
          placeholder="Input male prompt text"
          onChange={(e) => setState({ ...state, malePrompt: e.target.value })}
          value={state.malePrompt}
        />
      </Col>
      {/*  */}
      <Row align={"middle"} style={{ marginTop: "10px" }}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Model</Typography.Text>
          <div>
            <Select
              placeholder="Select model"
              style={{ width: 200 }}
              onChange={(e) => setState({ ...state, model: e })}
            >
              <Select.Option value="Selection 1">Something</Select.Option>
              <Select.Option value="Selection 2">Something</Select.Option>
            </Select>
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text style={{ margin: "0px 5px" }} strong>
            Clip skip
          </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.clipSkip}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, clipSkip: e.target.value })}
            />
          </div>
        </Col>
      </Row>

      {/*  */}
      <Row align={"middle"} style={{ marginTop: "10px" }}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Sampler</Typography.Text>
          <div>
            <Select
              placeholder="Select model"
              style={{ width: 200 }}
              onChange={(e) => setState({ ...state, sampler: e })}
            >
              <Select.Option value="Selection 1">Something</Select.Option>
              <Select.Option value="Selection 2">Something</Select.Option>
            </Select>
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text style={{ margin: "0px 5px" }} strong>
            Step
          </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.step}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, step: e.target.value })}
            />
          </div>
        </Col>
      </Row>
      {/*  */}
      <Row align={"middle"}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Hi-res</Typography.Text>
          <div>
            <Switch onChange={(e) => setState({ ...state, hiRes: e })} />
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Upscaler</Typography.Text>
          <div>
            <Select
              placeholder="Select model"
              style={{ width: 200 }}
              onChange={(e) => setState({ ...state, upscaler: e })}
            >
              <Select.Option value="Selection 1">Something</Select.Option>
              <Select.Option value="Selection 2">Something</Select.Option>
            </Select>
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text style={{ margin: "0px 5px" }} strong>
            Upscaled by
          </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.upscaledBy}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, upscaledBy: e.target.value })
              }
            />
          </div>
        </Col>
      </Row>
      {/*
       */}
      <Row align={"middle"}>
        <Col style={{ margin: "10px" }}>
          <div style={{ width: 42 }}></div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Hi-res step </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.hiResStep}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, hiResStep: e.target.value })
              }
            />
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text style={{ margin: "0px 5px" }} strong>
            Denoising strength
          </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.denoisingStrength}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, denoisingStrength: e.target.value })
              }
            />
          </div>
        </Col>
      </Row>
      {/*  */}

      <Row align={"middle"}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Width </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.width}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, width: e.target.value })}
            />
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Height </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.height}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, height: e.target.value })}
            />
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text style={{ margin: "0px 5px" }} strong>
            Number of Images
          </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.numberOfImage}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, numberOfImage: e.target.value })
              }
            />
          </div>
        </Col>
      </Row>
      {/*  */}

      <Row align={"middle"}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Config scale </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.configScale}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, configScale: e.target.value })
              }
            />
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Seed </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.seed}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, seed: e.target.value })}
            />
          </div>
        </Col>
      </Row>

      <Col style={{ margin: "10px" }}>
        <Typography.Text strong>Female images</Typography.Text>
        <Row align={"middle"}>
          {state.femaleExamples.map((item) => (
            <ImageDeleteable
              src={item}
              key={item}
              onDelete={(e) => {
                setState({
                  ...state,
                  femaleExamples: [
                    ...state.femaleExamples.filter((i) => i != e),
                  ],
                });
              }}
            />
          ))}
          {state.femaleExamples.length < 6 && (
            <UploadMultiple
              onChange={(e) => {
                setState({
                  ...state,
                  femaleExamples: [...state.femaleExamples, ...e],
                });
              }}
            />
          )}
        </Row>
      </Col>

      <Col style={{ margin: "10px" }}>
        <Typography.Text strong>Male images</Typography.Text>
        <Row align={"middle"}>
          {state.maleExamples.map((item) => (
            <ImageDeleteable
              src={item}
              key={item}
              onDelete={(e) => {
                setState({
                  ...state,
                  maleExamples: [...state.maleExamples.filter((i) => i != e)],
                });
              }}
            />
          ))}
          {state.maleExamples.length < 6 && (
            <UploadMultiple
              index={"male"}
              onChange={(e) => {
                setState({
                  ...state,
                  maleExamples: [...state.maleExamples, ...e],
                });
              }}
            />
          )}
        </Row>
      </Col>
    </Modal>
  );
};

const ImageDeleteable = ({ src, onDelete }) => {
  return (
    <div style={{ position: "relative" }}>
      <DeleteOutlined
        style={{
          fontSize: 24,
          position: "absolute",
          right: 0,
          zIndex: 100,
          color: "red",
          cursor: "pointer",
        }}
        onClick={() => onDelete(src)}
      />

      <Image
        src={src}
        width={120}
        style={{ borderRadius: 10, padding: 5 }}
        preview={false}
      />
    </div>
  );
};
const UploadMultiple = ({ maxCount = 6, onChange, index = "female" }) => {
  const [loading, setLoading] = useState(false);

  const handleUploadFiles = async (files) => {
    setLoading(true);
    const data = await Promise.all(
      files.map(async (file) => {
        const res = await uploadImage(file);
        return res;
      })
    );
    onChange(data);
    setLoading(false);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  return (
    <div className="">
      <input
        id={`fileUpload-${index}`}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileEvent}
        style={{ display: "none" }}
      />
      {loading ? (
        <Spin spinning indicator={<LoadingOutlined />} />
      ) : (
        <label htmlFor={`fileUpload-${index}`}>
          <a className={`btn btn-primary `}>Upload Files</a>
        </label>
      )}
    </div>
  );
};

const Style = ({
  premium,
  image,
  name = "Style's Name",
  onDelete,
  item,
  afterEdit,
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <Col align="center" style={{ width: 200, margin: "0px 20px" }}>
        <Typography.Text strong style={{ textAlign: "center" }}>
          {name}
        </Typography.Text>
        <div>
          {premium ? (
            <Typography.Text
              strong
              style={{ background: "#c79306", padding: "0px 20px" }}
            >
              PREMIUM
            </Typography.Text>
          ) : (
            <Typography.Text />
          )}
        </div>
        <Card cover={<img alt="example" src={image} />}>
          <Row justify={"space-between"} align="middle">
            <Button
              icon={<EditFilled />}
              type="primary"
              style={{ flex: 1, margin: "0px 10px" }}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
            <Popconfirm onConfirm={onDelete}>
              <Button icon={<DeleteFilled style={{ color: "red" }} />} />
            </Popconfirm>
          </Row>
        </Card>
      </Col>
      <EditModal
        afterEdit={afterEdit}
        open={edit}
        onClose={() => {
          setEdit(false);
        }}
        data={item}
      />
    </>
  );
};

const EditModal = ({ open, onClose, data, afterEdit }) => {
  const [state, setState] = useState(data);
  const [loading, setLoading] = useState(false);

  const onOk = async () => {
    try {
      setLoading(true);
      let body = { ...state };
      delete body.categoryId;
      delete body._id;
      await Api.update(state._id, state);
      message.success("Update success");
      onClose();
    } catch (err) {
      message.error(JSON.stringify(err));
    } finally {
      setLoading(false);
      afterEdit();
    }
  };
  return (
    <Modal
      onOk={onOk}
      confirmLoading={loading}
      open={open}
      onCancel={onClose}
      title="Editing Style"
      width={"100%"}
      closable
      maskClosable={false}
    >
      <>
        <Row justify={"end"} align="middle">
          <Row align={"middle"}>
            <Typography.Text strong style={{ padding: `0px 5px` }}>
              Premium{" "}
            </Typography.Text>
            <Switch
              checked={state.premium}
              onChange={(e) => setState({ ...state, premium: e })}
            />
          </Row>

          <Row align={"middle"} style={{ margin: `0px 20px` }}>
            <Typography.Text strong style={{ padding: `0px 5px` }}>
              Credit{" "}
            </Typography.Text>
            <Input
              style={{ maxWidth: 50 }}
              value={state.credit}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, credit: e.target.value })}
            />
          </Row>
        </Row>
        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Name</Typography.Text>
          <Input
            placeholder="Input style's name"
            onChange={(e) => setState({ ...state, name: e.target.value })}
            value={state.name}
          />
        </Col>

        {/* ? */}
        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Female prompt</Typography.Text>
          <Input
            placeholder="Input female prompt text"
            onChange={(e) =>
              setState({ ...state, femalePrompt: e.target.value })
            }
            value={state.femalePrompt}
          />
        </Col>

        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Male prompt</Typography.Text>
          <Input
            placeholder="Input male prompt text"
            onChange={(e) => setState({ ...state, malePrompt: e.target.value })}
            value={state.malePrompt}
          />
        </Col>
        {/*  */}
        <Row align={"middle"} style={{ marginTop: "10px" }}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Model</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, model: e })}
              >
                <Select.Option value="Selection 1">Something</Select.Option>
                <Select.Option value="Selection 2">Something</Select.Option>
              </Select>
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text style={{ margin: "0px 5px" }} strong>
              Clip skip
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.clipSkip}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, clipSkip: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>

        {/*  */}
        <Row align={"middle"} style={{ marginTop: "10px" }}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Sampler</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, sampler: e })}
              >
                <Select.Option value="Selection 1">Something</Select.Option>
                <Select.Option value="Selection 2">Something</Select.Option>
              </Select>
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text style={{ margin: "0px 5px" }} strong>
              Step
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.step}
                type={"number"}
                min={0}
                onChange={(e) => setState({ ...state, step: e.target.value })}
              />
            </div>
          </Col>
        </Row>
        {/*  */}
        <Row align={"middle"}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Hi-res</Typography.Text>
            <div>
              <Switch onChange={(e) => setState({ ...state, hiRes: e })} />
            </div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Upscaler</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, upscaler: e })}
              >
                <Select.Option value="Selection 1">Something</Select.Option>
                <Select.Option value="Selection 2">Something</Select.Option>
              </Select>
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text style={{ margin: "0px 5px" }} strong>
              Upscaled by
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.upscaledBy}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, upscaledBy: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>
        {/*
         */}
        <Row align={"middle"}>
          <Col style={{ margin: "10px" }}>
            <div style={{ width: 42 }}></div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Hi-res step </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.hiResStep}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, hiResStep: e.target.value })
                }
              />
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text style={{ margin: "0px 5px" }} strong>
              Denoising strength
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.denoisingStrength}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, denoisingStrength: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>
        {/*  */}

        <Row align={"middle"}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Width </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.width}
                type={"number"}
                min={0}
                onChange={(e) => setState({ ...state, width: e.target.value })}
              />
            </div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Height </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.height}
                type={"number"}
                min={0}
                onChange={(e) => setState({ ...state, height: e.target.value })}
              />
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text style={{ margin: "0px 5px" }} strong>
              Number of Images
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.numberOfImage}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, numberOfImage: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>
        {/*  */}

        <Row align={"middle"}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Config scale </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.configScale}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, configScale: e.target.value })
                }
              />
            </div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Seed </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.seed}
                type={"number"}
                min={0}
                onChange={(e) => setState({ ...state, seed: e.target.value })}
              />
            </div>
          </Col>
        </Row>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Female images</Typography.Text>
          <Row align={"middle"}>
            {state.femaleExamples?.map((item) => (
              <ImageDeleteable
                src={item}
                key={item}
                onDelete={(e) => {
                  setState({
                    ...state,
                    femaleExamples: [
                      ...state.femaleExamples.filter((i) => i != e),
                    ],
                  });
                }}
              />
            ))}
            {state.femaleExamples?.length < 6 && (
              <UploadMultiple
                onChange={(e) => {
                  setState({
                    ...state,
                    femaleExamples: [...state.femaleExamples, ...e],
                  });
                }}
              />
            )}
          </Row>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Male images</Typography.Text>
          <Row align={"middle"}>
            {state.maleExamples?.map((item) => (
              <ImageDeleteable
                src={item}
                key={item}
                onDelete={(e) => {
                  setState({
                    ...state,
                    maleExamples: [...state.maleExamples.filter((i) => i != e)],
                  });
                }}
              />
            ))}
            {state.maleExamples?.length < 6 && (
              <UploadMultiple
                index={"male"}
                onChange={(e) => {
                  setState({
                    ...state,
                    maleExamples: [...state.maleExamples, ...e],
                  });
                }}
              />
            )}
          </Row>
        </Col>
      </>
    </Modal>
  );
};
