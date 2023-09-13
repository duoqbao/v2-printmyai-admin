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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../api/styles";
import { uploadImage } from "../../../api/upload";
import Arrange from "./Arrange";

export default function StyleByCategory() {
  const { categoryId } = useParams();
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [category, setCategory] = useState({ name: "Category" });
  const [options, setOptions] = useState({
    samplers: [],
    faceSwapUpscalers: [],
    faceRestorers: [],
    hiResUpscalers: [],
    models: [],
  });
  useEffect(() => {
    (async () => {
      const data = await Api.getOptions();
      setOptions(data);
    })();
  }, []);

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
      <Row
        justify="space-between"
        align={"middle"}
        style={{ background: "#fff", padding: 10, borderRadius: 5 }}
      >
        <Typography.Title strong level={4}>
          {" "}
          {category.name}
        </Typography.Title>
        <Arrange setRefetch={setRefetch} />

        <Row align={"middle"}>
          <Typography.Text style={{ padding: "0px 10px" }}>
            Current
            <Typography.Text strong> {data.length}</Typography.Text> styles
          </Typography.Text>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </Row>
      </Row>
      <div
        style={{
          display: "flex",
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
            options={options}
          />
        ))}
      </div>
      <AddModal
        options={options}
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
const AddModal = ({ open, onClose, options }) => {
  const { categoryId } = useParams();
  const [coupleExamples, setCoupleExamples] = useState([]);
  const [femaleExamples, setFemaleExamples] = useState([]);
  const [maleExamples, setMaleExamples] = useState([]);
  const [state, setState] = useState({
    name: "",
    premium: true,
    credit: 1,
    femalePrompt: "",
    malePrompt: "",
    negative: "",
    model: "Model.safetensors",
    sampler: "DPM++ 2M Karras",
    clipSkip: 1,
    step: 20,
    hiRes: true,
    hiResStep: 10,
    hiResUpscaler: "Hires_Upscaler",
    hiResUpscaledBy: 2,
    denoisingStrength: 0.45,
    width: 512,
    height: 768,
    batchCount: 2,
    batchSize: 3,
    seed: -1,
    configScale: 7,
    faceSwap: true,
    faceSwapUpscaler: "FS_Upscaler",
    faceSwapUpscaledBy: 2,
    restoreFace: "None",
    faceSwapSameGender: true,
    maleNegative: "",
    couplePrompt: "",
    coupleNegative: "",
  });
  const [loading, setLoading] = useState(false);
  const onOk = async () => {
    if (!state.femalePrompt && !state.malePrompt && !state.couplePrompt) {
      message.error(
        "Include at least one prompt. Female or Male or Couple one"
      );
      return;
    }
    try {
      setLoading(true);
      const data = await Api.createStyleByCategoryId(categoryId, {
        ...state,
        coupleExamples,
        femaleExamples,
        maleExamples,
      });
      onClose(data);
    } catch (err) {
      message.error(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
    setState({
      name: "",
      premium: true,
      credit: 1,
      femalePrompt: "",
      malePrompt: "",
      negative: "",
      model: "Model.safetensors",
      sampler: "DPM++ 2M Karras",
      clipSkip: 1,
      step: 20,
      hiRes: true,
      hiResStep: 10,
      hiResUpscaler: "Hires_Upscaler",
      hiResUpscaledBy: 2,
      denoisingStrength: 0.45,
      width: 512,
      height: 768,
      batchCount: 2,
      batchSize: 3,
      seed: -1,
      configScale: 7,
      faceSwap: true,
      faceSwapUpscaler: "FS_Upscaler",
      faceSwapUpscaledBy: 2,
      restoreFace: "None",
      faceSwapSameGender: true,
      maleNegative: "",
      couplePrompt: "",
      coupleNegative: "",
    });
    setCoupleExamples([]);
    setFemaleExamples([]);
    setMaleExamples([]);
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
      <Row justify={""} align="middle">
        <Row align={"middle"}>
          <Typography.Text strong>Name</Typography.Text>
          <Input
            placeholder="Input style's name"
            onChange={(e) => setState({ ...state, name: e.target.value })}
            value={state.name}
          />
        </Row>
        <Row align={"middle"} style={{ padding: `0px 50px` }}>
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
            style={{ maxWidth: 70, textAlign: "center" }}
            value={state.credit}
            type={"number"}
            min={0}
            onChange={(e) => setState({ ...state, credit: e.target.value })}
          />
        </Row>
      </Row>

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

      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Couple prompt</Typography.Text>
        <Input
          placeholder="Input male prompt text"
          onChange={(e) => setState({ ...state, couplePrompt: e.target.value })}
          value={state.couplePrompt}
        />
      </Col>

      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Female Negative prompt</Typography.Text>
        <Input.TextArea
          size={10}
          placeholder="Input female prompt text"
          onChange={(e) => setState({ ...state, negative: e.target.value })}
          value={state.negative}
        />
      </Col>
      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Male negative prompt</Typography.Text>
        <Input.TextArea
          size={10}
          placeholder="Input female prompt text"
          onChange={(e) => setState({ ...state, maleNegative: e.target.value })}
          value={state.maleNegative}
        />
      </Col>
      <Col style={{ marginTop: "10px" }}>
        <Typography.Text strong>Couple negative prompt</Typography.Text>
        <Input.TextArea
          size={10}
          placeholder="Input female prompt text"
          onChange={(e) =>
            setState({ ...state, coupleNegative: e.target.value })
          }
          value={state.coupleNegative}
        />
      </Col>
      {/*  */}
      <Row align={"middle"} style={{ marginTop: "10px" }}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Model</Typography.Text>
          <div>
            <Select
              value={state?.model}
              placeholder="Select model"
              style={{ width: 200 }}
              onChange={(e) => setState({ ...state, model: e })}
            >
              {options?.models.map((i) => {
                return <Select.Option value={i.title}>{i.title}</Select.Option>;
              })}
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
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Sampler</Typography.Text>
          <div>
            <Select
              style={{ width: 200 }}
              onChange={(e) => setState({ ...state, sampler: e })}
              value={state?.sampler}
            >
              {options?.samplers.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
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
      {/*  */}
      <Row align={"middle"}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Hi-res</Typography.Text>
          <div>
            <Switch
              value={state?.hiRes}
              onChange={(e) => setState({ ...state, hiRes: e })}
              checked={state.hiRes}
            />
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Upscaler</Typography.Text>
          <div>
            <Select
              placeholder="Select model"
              style={{ width: 300 }}
              onChange={(e) => setState({ ...state, hiResUpscaler: e })}
              value={state?.hiResUpscaler}
            >
              {options.faceSwapUpscalers.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
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
              value={state.hiResUpscaledBy}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, hiResUpscaledBy: e.target.value })
              }
            />
          </div>
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
      {/*
       */}

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
            Batch count
          </Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.batchCount}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, batchCount: e.target.value })
              }
            />
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Batch size</Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.batchSize}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, batchSize: e.target.value })
              }
            />
          </div>
        </Col>

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
      {/*  */}
      <Row align={"middle"}>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Face-swap</Typography.Text>
          <div>
            <Switch
              onChange={(e) => setState({ ...state, faceSwap: e })}
              checked={state.faceSwap}
            />
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Same gender</Typography.Text>
          <div>
            <Switch
              onChange={(e) => setState({ ...state, faceSwapSameGender: e })}
              checked={state.faceSwapSameGender}
            />
          </div>
        </Col>
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Restore face </Typography.Text>
          <div>
            <Select
              placeholder="Select model"
              style={{ width: 200 }}
              onChange={(e) => setState({ ...state, restoreFace: e })}
              value={state?.restoreFace}
            >
              {[{ name: "None" }, ...options.faceRestorers].map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Upscaler</Typography.Text>
          <div>
            <Select
              placeholder="Select model"
              style={{ width: 300 }}
              onChange={(e) => setState({ ...state, faceSwapUpscaler: e })}
              value={state?.faceSwapUpscaler}
            >
              {options.faceSwapUpscalers.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </div>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Upscaled by</Typography.Text>
          <div>
            <Input
              style={{ maxWidth: 120 }}
              value={state.faceSwapUpscaledBy}
              type={"number"}
              min={0}
              onChange={(e) =>
                setState({ ...state, faceSwapUpscaledBy: e.target.value })
              }
            />
          </div>
        </Col>
      </Row>

      {/*  */}

      <Col style={{ margin: "10px" }}>
        <Typography.Text strong>Female images</Typography.Text>
        <Row align={"middle"}>
          {femaleExamples.map((item) => (
            <ImageDeleteable
              src={item}
              key={item}
              onDelete={(e) => {
                setFemaleExamples((prev) => prev.filter((i) => i != e));
              }}
            />
          ))}
          {femaleExamples.length < 6 && (
            <UploadMultiple
              onChange={(e) => {
                console.log(e);
                setFemaleExamples((prev) => [...prev, ...e]);
              }}
              index="female"
            />
          )}
        </Row>
      </Col>

      <Col style={{ margin: "10px" }}>
        <Typography.Text strong>Male images</Typography.Text>
        <Row align={"middle"}>
          {maleExamples.map((item) => (
            <ImageDeleteable
              src={item}
              key={item}
              onDelete={(e) => {
                setMaleExamples((prev) => prev.filter((i) => i != e));
              }}
            />
          ))}
          {maleExamples.length < 6 && (
            <UploadMultiple
              onChange={(e) => {
                setMaleExamples((prev) => [...prev, ...e]);
              }}
              index="male"
            />
          )}
        </Row>
      </Col>

      <Col style={{ margin: "10px" }}>
        <Typography.Text strong>Couple images</Typography.Text>
        <Row align={"middle"}>
          {coupleExamples.map((item) => (
            <ImageDeleteable
              src={item}
              key={item}
              onDelete={(e) => {
                setCoupleExamples((prev) => prev.filter((i) => i != e));
              }}
            />
          ))}
          {coupleExamples.length < 6 && (
            <UploadMultiple
              index="couple"
              onChange={(e) => {
                setCoupleExamples((prev) => [...prev, ...e]);
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
  options,
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 0,
        margin: 10,
        borderRadius: 10,
      }}
    >
      <Col align="center" style={{ width: 200, margin: "0px 20px" }}>
        <Typography.Title level={3} strong style={{ textAlign: "center" }}>
          {name}
        </Typography.Title>
        <div>
          {premium ? (
            <Typography.Text
              strong
              style={{
                background: "#c79306",
                padding: "0px 20px",
                borderRadius: 5,
              }}
            >
              PREMIUM
            </Typography.Text>
          ) : (
            <Typography.Text />
          )}
        </div>
        <Card
          cover={
            <img
              alt="example"
              src={image}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          }
          type="inner"
          bodyStyle={{ height: "100%" }}
        >
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
        options={options}
      />
    </div>
  );
};

const EditModal = ({ open, onClose, data, afterEdit, options }) => {
  const [state, setState] = useState(data);
  const [loading, setLoading] = useState(false);
  const [coupleExamples, setCoupleExamples] = useState(data.coupleExamples);
  const [femaleExamples, setFemaleExamples] = useState(data.femaleExamples);
  const [maleExamples, setMaleExamples] = useState(data.maleExamples);
  const onOk = async () => {
    try {
      setLoading(true);
      let body = { ...state };
      delete body.categoryId;
      delete body._id;
      await Api.update(state._id, {
        ...state,
        coupleExamples,
        femaleExamples,
        maleExamples,
      });
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
        <Row justify={"flex-start"} align="middle">
          <Row>
            <Typography.Text strong>Name</Typography.Text>
            <Input
              placeholder="Input style's name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
              value={state.name}
            />
          </Row>
          <Row align={"middle"} style={{ margin: "0px 50px" }}>
            <Typography.Text strong style={{ padding: `0px 5px` }}>
              Premium{" "}
            </Typography.Text>
            <Switch
              checked={state?.premium}
              onChange={(e) => setState({ ...state, premium: e })}
            />
          </Row>

          <Row align={"middle"} style={{ margin: `0px 50px` }}>
            <Typography.Text strong style={{ padding: `0px 5px` }}>
              Credit{" "}
            </Typography.Text>
            <Input
              style={{ maxWidth: 70, textAlign: "center" }}
              value={state.credit}
              type={"number"}
              min={0}
              onChange={(e) => setState({ ...state, credit: e.target.value })}
            />
          </Row>
        </Row>

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
        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Couple prompt</Typography.Text>
          <Input
            placeholder="Input male prompt text"
            onChange={(e) =>
              setState({ ...state, couplePrompt: e.target.value })
            }
            value={state.couplePrompt}
          />
        </Col>
        {/*  */}
        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Negative prompt</Typography.Text>
          <Input.TextArea
            size={10}
            placeholder="Input female prompt text"
            onChange={(e) => setState({ ...state, negative: e.target.value })}
            value={state.negative}
          />
        </Col>
        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Male negative prompt</Typography.Text>
          <Input.TextArea
            size={10}
            placeholder="Input female prompt text"
            onChange={(e) =>
              setState({ ...state, maleNegative: e.target.value })
            }
            value={state.maleNegative}
          />
        </Col>
        <Col style={{ marginTop: "10px" }}>
          <Typography.Text strong>Couple negative prompt</Typography.Text>
          <Input.TextArea
            size={10}
            placeholder="Input female prompt text"
            onChange={(e) =>
              setState({ ...state, coupleNegative: e.target.value })
            }
            value={state.coupleNegative}
          />
        </Col>

        {/*  */}
        <Row align={"middle"} style={{ marginTop: "10px" }}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Model</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                value={state?.model}
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, model: e })}
              >
                {options?.models.map((i) => {
                  return (
                    <Select.Option value={i.title}>{i.title}</Select.Option>
                  );
                })}
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
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Sampler</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, sampler: e })}
                value={state?.sampler}
              >
                {options?.samplers.map((item) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
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

        {/*  */}
        <Row align={"middle"}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Hi-res</Typography.Text>
            <div>
              <Switch
                onChange={(e) => setState({ ...state, hiRes: e })}
                checked={state?.hiRes}
              />
            </div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Upscaler</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, hiResUpscaler: e })}
                value={state?.hiResUpscaler}
              >
                {options?.faceSwapUpscalers.map((item) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
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
                value={state.hiResUpscaledBy}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, hiResUpscaledBy: e.target.value })
                }
              />
            </div>
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
        {/*
         */}

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
              Batch count
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.batchCount}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, batchCount: e.target.value })
                }
              />
            </div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text style={{ margin: "0px 5px" }} strong>
              Batch size
            </Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.batchSize}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, batchSize: e.target.value })
                }
              />
            </div>
          </Col>

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
        {/*  */}
        <Row align={"middle"}>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Face-swap</Typography.Text>
            <div>
              <Switch
                onChange={(e) => setState({ ...state, faceSwap: e })}
                checked={state.faceSwap}
              />
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Same gender</Typography.Text>
            <div>
              <Switch
                onChange={(e) => setState({ ...state, faceSwapSameGender: e })}
                checked={state.faceSwapSameGender}
              />
            </div>
          </Col>

          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Upscaler</Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, faceSwapUpscaler: e })}
                value={state?.faceSwapUpscaler}
              >
                {options?.faceSwapUpscalers.map((item) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Restore face </Typography.Text>
            <div>
              <Select
                placeholder="Select model"
                style={{ width: 200 }}
                onChange={(e) => setState({ ...state, restoreFace: e })}
                value={state?.restoreFace}
              >
                {[{ name: "None" }, ...options.faceRestorers].map((item) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Typography.Text strong>Upscaled by</Typography.Text>
            <div>
              <Input
                style={{ maxWidth: 120 }}
                value={state.faceSwapUpscaledBy}
                type={"number"}
                min={0}
                onChange={(e) =>
                  setState({ ...state, faceSwapUpscaledBy: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>
        {/*  */}
        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Female images</Typography.Text>
          <Row align={"middle"}>
            {femaleExamples.map((item) => (
              <ImageDeleteable
                src={item}
                key={item}
                onDelete={(e) => {
                  setFemaleExamples((prev) => prev.filter((i) => i != e));
                }}
              />
            ))}
            {femaleExamples.length < 6 && (
              <UploadMultiple
                onChange={(e) => {
                  setFemaleExamples((prev) => [...prev, ...e]);
                }}
                index={`female-edit-${data._id}`}
              />
            )}
          </Row>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Male images</Typography.Text>
          <Row align={"middle"}>
            {maleExamples.map((item) => (
              <ImageDeleteable
                src={item}
                key={item}
                onDelete={(e) => {
                  setMaleExamples((prev) => prev.filter((i) => i != e));
                }}
              />
            ))}
            {maleExamples.length < 6 && (
              <UploadMultiple
                onChange={(e) => {
                  setMaleExamples((prev) => [...prev, ...e]);
                }}
                index={`male-edit-${data._id}`}
              />
            )}
          </Row>
        </Col>

        <Col style={{ margin: "10px" }}>
          <Typography.Text strong>Couple images</Typography.Text>
          <Row align={"middle"}>
            {coupleExamples.map((item) => (
              <ImageDeleteable
                src={item}
                key={item}
                onDelete={(e) => {
                  setCoupleExamples((prev) => prev.filter((i) => i != e));
                }}
              />
            ))}
            {coupleExamples.length < 6 && (
              <UploadMultiple
                index={`couple-edit-${data._id}`}
                onChange={(e) => {
                  setCoupleExamples((prev) => [...prev, ...e]);
                }}
              />
            )}
          </Row>
        </Col>
      </>
    </Modal>
  );
};
