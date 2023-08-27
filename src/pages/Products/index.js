import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Spin,
  Image,
  Modal,
  Input,
  Table,
  Button,
  AutoComplete,
  message,
  Popconfirm,
  Empty,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import Product from "api/product";
import Carousel from "components/Carousel/idnex";
import "./index.scss";
import ChangeSize from "./ChangeSize";
import ModalSale from "./ModalSale";
import UploadInput from "components/UpLoad";
import { uploadImage } from "api/upload";
import { InfoCircleFilled, LoadingOutlined } from "@ant-design/icons";
function removeEmptyFields(obj) {
  for (let prop in obj) {
    if (
      obj[prop] === null ||
      obj[prop] === "" ||
      obj[prop] === undefined ||
      obj[prop].length === 0
    ) {
      delete obj[prop];
    }
  }
  return obj;
}
export default function Products({ handleForceReload, types }) {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [listBluePrint, setListBulePrint] = useState([]);
  const [listModal, setListModal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const { id } = params;
  const [productAdd, setProductAdd] = useState({});
  const [inputSearch, setInputSearch] = useState("");
  const [printProvider, setPrintProvider] = useState([]);
  const [loadingModalAdd, setLoadingModalAdd] = useState(false);
  //const [providerOther, setProviderOther] = useState([]);

  const [isOnSale, setIsOnSale] = useState(false);
  const [sale, setSale] = useState({});
  const getAllBlueprints = async () => {
    const res_1 = await Product.getAllBlueprint();
    setListBulePrint(res_1);
    setListModal(res_1);
  };

  useEffect(() => {
    document.title = "Products";
    getAllBlueprints();
  }, [id]);
  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (item = []) => {
        return (
          <div>
            <Image src={item[0]} />
          </div>
        );
      },
    },
    {
      key: "action",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => {
                setProductAdd(item);
                getPrintProvider(item.id);
                setIsInput(true);
              }}
              type="primary"
            >
              Select
            </Button>
          </div>
        );
      },
    },
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
  const formattedNumber = (number) => {
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "";
  };
  const normalizeDataColor = (data = []) => {
    const variants = [];
    data.forEach((item) => {
      const commonIds = item[`${item.size}ed`].reduce(
        (accumulator, current) => {
          if (item.list.some((obj) => obj.id === current)) {
            accumulator.push(current);
          }
          return accumulator;
        },
        []
      );
      item.list
        .filter((obj) => commonIds.includes(obj.id))
        .map((obj) => variants.push({ ...obj }));
    });
    return variants;
  };
  const addProduct = async () => {
    if (productAdd.price === "" || productAdd.price === null) {
      message.error("Input price is required");
      return;
    }
    const product = removeEmptyFields(productAdd);
    try {
      if (productAdd._id) {
        const res = await Product.update(productAdd._id, product);
        message.success("Updated product");
      } else {
        const res = await Product.creted(id, product);
        handleForceReload();
        message.success("Created product");
      }
      onCloseAddProduct();
    } catch (error) {
      message.error("Error creating product");
    }
  };
  const onCloseAddProduct = async () => {
    setProductAdd({});
    setInputSearch("");
    setIsVisible(false);
    setIsInput(false);
    setPrintProvider([]);
  };
  const getPrintProvider = async (id) => {
    try {
      setLoadingModalAdd(true);
      const res = await Product.getPrintProvider(id);
      setPrintProvider(res);
      setLoadingModalAdd(false);
    } catch (error) {}
  };
  const handleOnSales = async (item) => {
    if (item.onSale) {
      handleSaleUpdate(0, item);
      return;
    }
    setSale(item);
    setIsOnSale(true);
  };
  const handleSaleUpdate = async (priceSale, item) => {
    try {
      const res = await Product.toggleSale(priceSale, item._id);
      const indexProduct = product.findIndex(
        (product) => product._id === item._id
      );
      if (indexProduct > -1) {
        const temp = [...product];
        temp[indexProduct] = res;
        setProduct(temp);
      }
      message.success("Updated successful");
      setSale({});
      setIsOnSale(false);
    } catch (error) {}
  };
  const onChangeUrl = (e) => {
    const tempData = { ...productAdd };
    tempData.image = e;
    setProductAdd(tempData);
  };
  const beforeUpload = (event) => {
    uploadImage(event)
      .then((res) => {
        onChangeUrl(res);
      })
      .catch((err) => {
        onChangeUrl("");
        message.error("Failed to upload image");
      });
  };
  return (
    <div className="layout-styles product">
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col xs="24" span={24}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setIsVisible(true);
                }}
                type="primary"
              >
                Add product
              </Button>
            </div>
          </Col>
        </Row>
        <Modal
          open={isVisible}
          title="Add Product"
          width={900}
          footer={null}
          destroyOnClose
          onCancel={() => setIsVisible(false)}
          closable
          zIndex={99}
        >
          <div>
            <div>
              <Input.Search
                value={inputSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  const newList = listBluePrint.filter((item) =>
                    item.title.toUpperCase().includes(value.toUpperCase())
                  );
                  setListModal(newList);
                  setInputSearch(value);
                }}
              />
            </div>
            <div className="layout-styles">
              <Row gutter={[24, 24]}>
                <Col xs="24" xl={24}>
                  <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Table Products"
                  >
                    <div className="table-responsive">
                      <Table
                        columns={columns}
                        dataSource={listModal}
                        pagination={true}
                        className="ant-border-space"
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
        <Modal
          title={productAdd._id ? "Edit Product" : "Input Product"}
          zIndex={100}
          visible={isInput}
          onOk={addProduct}
          onCancel={() => {
            setIsInput(false);
          }}
          okText={productAdd._id ? "Save" : "Create"}
          width={700}
        >
          <div className="product">
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <div className="input">
                  <label>Name</label>
                  <Input
                    value={productAdd.title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setProductAdd({ ...productAdd, title: value });
                    }}
                  />
                </div>
              </Col>
              <Col span={24}>
                <UploadInput
                  data={productAdd.image}
                  setData={(e) => onChangeUrl(e)}
                  uploadFile={beforeUpload}
                />
              </Col>

              <Col span={24}>
                <div className="input">
                  <label>Type</label>
                  <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={250}
                    style={{ width: "100%" }}
                    options={types}
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={(e) => setProductAdd({ ...productAdd, type: e })}
                    onChange={(e) => setProductAdd({ ...productAdd, type: e })}
                    value={productAdd.type}
                  >
                    <Input placeholder="input here" />
                  </AutoComplete>
                </div>
              </Col>
              <Col span={24}>
                <div className="input">
                  <label>Price</label>
                  <Input
                    prefix={`$`}
                    value={formattedNumber(productAdd.price || 0)}
                    onKeyPress={isNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      const temp = { ...productAdd };
                      temp.price = value.replace(/,/g, "");
                      setProductAdd(temp);
                    }}
                  />
                </div>
              </Col>
              <Col span={24}>
                <Col>
                  <div>
                    <Typography.Text strong>Size chart</Typography.Text>
                  </div>
                  {productAdd?.sizeImage ? (
                    <>
                      <Image
                        src={productAdd.sizeImage}
                        width={100}
                        height={100}
                        style={{ borderRadius: 5 }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
                <SizeImage
                  id={productAdd?._id || new Date().getTime()}
                  onChange={(e) =>
                    setProductAdd({ ...productAdd, sizeImage: e })
                  }
                />
              </Col>
              <Col span={24}>
                <div className="input">
                  <label>Provider </label>
                  <Select
                    style={{ width: "100%" }}
                    value={productAdd?.printProvider?.id}
                    loading={loadingModalAdd}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    optionFilterProp="children"
                    showSearch
                    onChange={(e) => {
                      const temp = printProvider.find((item) => item.id === e);
                      if (temp) {
                        const printProvider = {
                          name: temp.title,
                          address:
                            temp.location && temp.location?.address1
                              ? temp.location?.address1
                              : temp.location?.address2,
                          id: e,
                        };
                        setProductAdd({
                          ...productAdd,
                          printProvider: printProvider,
                          color: "",
                          hexColor: "",
                          sizes: [],
                        });
                      }
                    }}
                  >
                    {printProvider.map((provider, index) => {
                      return (
                        <Select.Option value={provider.id}>
                          <strong>{provider.title}</strong>{" "}
                          {provider.location && provider.location?.address1
                            ? provider.location?.address1
                            : provider.location?.address2}{" "}
                          {provider.location?.city}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </Col>
              {productAdd?.printProvider && productAdd?.printProvider?.id ? (
                <Col span={24}>
                  <ChangeSize
                    basePrice={productAdd?.price}
                    id={productAdd.id}
                    idProvider={productAdd?.printProvider?.id}
                    setDataVariants={setProductAdd}
                    variants={productAdd}
                  />
                </Col>
              ) : (
                <></>
              )}
            </Row>
          </div>
        </Modal>
        <ModalSale
          isOpen={isOnSale}
          setOpen={setIsOnSale}
          item={sale}
          setItem={setSale}
          handleSaleUpdate={handleSaleUpdate}
        />
      </Spin>
    </div>
  );
}

const SizeImage = ({ onChange, id }) => {
  const [loading, setLoading] = useState(false);

  const handleUploadFiles = async (files) => {
    setLoading(true);
    const data = await Promise.all(
      files.map(async (file) => {
        const res = await uploadImage(file);
        return res;
      })
    );
    onChange(data[0]);
    setLoading(false);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  return (
    <div className="">
      <input
        id={`fileUpload-${id}`}
        type="file"
        accept="image/*"
        onChange={handleFileEvent}
        style={{ display: "none" }}
      />
      {loading ? (
        <Spin spinning indicator={<LoadingOutlined />} />
      ) : (
        <label htmlFor={`fileUpload-${id}`}>
          <a className={`btn btn-primary `}>Upload Files</a>
        </label>
      )}
    </div>
  );
};
