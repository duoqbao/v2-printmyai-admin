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
import { InfoCircleFilled } from "@ant-design/icons";
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
export default function Products() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [listBluePrint, setListBulePrint] = useState([]);
  const [listModal, setListModal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [types, setTypes] = useState([]);
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
  const getData = async () => {
    setLoading(true);
    try {
      const res = await Product.getList(id);
      setProduct(res);
      if (res) {
        const uniqueArr = res.filter((obj, index, self) => {
          const types = self.map((obj) => obj.type);
          return types.indexOf(obj.type) === index;
        });
        const temp = uniqueArr?.map((item) => {
          return {
            value: item.type,
          };
        });
        setTypes(temp);
      }
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    document.title = "Products";
    getAllBlueprints();
    getData();
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
        message.success("Created product");
      }
      onCloseAddProduct();
      getData();
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
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product by Category"
            >
              <div
                style={{ display: "flex", justifyContent: "end", padding: 16 }}
              >
                <Button
                  onClick={() => {
                    setIsVisible(true);
                  }}
                  type="primary"
                >
                  Add product
                </Button>
              </div>
              <Row
                className="rowgap-vbox"
                gutter={[24, 0]}
                style={{ padding: 24 }}
              >
                {product.length > 0 ? (
                  product?.map((c, index) => (
                    <Col
                      key={index}
                      xs={24}
                      sm={24}
                      md={12}
                      lg={6}
                      xl={6}
                      className="mb-24"
                    >
                      <Card bordered={false} className="criclebox ">
                        <div className="card">
                          {/* <Carousel
                            style={{ width: "80%" }}
                            images={c.images}
                          /> */}
                          <Image
                            style={{ width: "230px", height: "150px" }}
                            src={c.image}
                          />
                          <h1>{c.title}</h1>
                          {c?.onSale && (
                            <>
                              <p className="price sale">{`-${
                                formattedNumber(c.salePrice || 0) || 0
                              }%`}</p>
                              <Tooltip
                                placement="left"
                                title={
                                  <div
                                    style={{
                                      minHeight: 300,
                                      minWidth: 200,
                                      background: "#fff",
                                    }}
                                  >
                                    {c.sizes.map((s) => (
                                      <div
                                        style={{
                                          padding: 10,
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "10px 0px",
                                          }}
                                        >
                                          <Typography
                                            style={{
                                              color: "#333",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {s.title} :
                                          </Typography>
                                          <Typography
                                            style={{
                                              color: "#bd4040",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {parseFloat(
                                              s?.price
                                                ? s?.price -
                                                    s?.price *
                                                      (c?.salePrice / 100)
                                                : c.price -
                                                    c?.price *
                                                      (c?.salePrice / 100)
                                            ).toFixed(2)}{" "}
                                            $
                                          </Typography>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                        >
                                          <Typography
                                            style={{
                                              fontWeight: "bold",
                                              textDecoration: "line-through",
                                            }}
                                          >
                                            {s?.price ? s?.price : c.price} $
                                          </Typography>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                }
                              >
                                <InfoCircleFilled
                                  style={{ color: "#0a5266" }}
                                />
                              </Tooltip>
                            </>
                          )}
                          <p class="price">{`$ ${formattedNumber(
                            c.price || 0
                          )}`}</p>

                          <p>{c.type}</p>
                          <div>
                            {!c.onSale ? (
                              <Button
                                type="success"
                                onClick={() => handleOnSales(c)}
                              >
                                On Sales
                              </Button>
                            ) : (
                              <Button
                                ghost
                                danger
                                onClick={() => handleOnSales(c)}
                              >
                                Off Sales
                              </Button>
                            )}
                          </div>

                          <div className="button-flex">
                            <Button
                              onClick={() => {
                                getPrintProvider(c.id);
                                const tempProduct = { ...c };
                                tempProduct.providerOther =
                                  tempProduct?.providerOther?.information?.id;
                                tempProduct.providerUS =
                                  tempProduct?.providerUS?.information?.id;
                                setProductAdd(tempProduct || {});
                                setIsInput(true);
                              }}
                              type="warning"
                            >
                              Edit
                            </Button>
                            <Popconfirm
                              title="Are you sure ? "
                              onConfirm={async () => {
                                try {
                                  const res = await Product.delete(c._id);
                                  message.success("Delete Success");
                                  getData();
                                } catch (error) {
                                  message.error("Delete Failed");
                                }
                              }}
                              onCancel={() => {}}
                            >
                              <Button type="danger">Delete</Button>
                            </Popconfirm>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Empty />
                  </div>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          open={isVisible}
          title="Add Product"
          width={900}
          footer={null}
          onCancel={onCloseAddProduct}
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
