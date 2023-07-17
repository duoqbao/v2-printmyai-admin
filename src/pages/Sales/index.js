import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Spin,
  Button,
  message,
  Popconfirm,
  Empty,
  Input,
  Image,
  Tooltip,
  Typography,
} from "antd";
import ApiProduct from "api/product";
import Carousel from "components/Carousel/idnex";
import "./index.scss";
import { InfoCircleFilled } from "@ant-design/icons";
const formattedNumber = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};

const InputPrice = ({ value, setPriceSale }) => {
  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <label>Price Sale</label>
      <Input
        prefix="%"
        value={formattedNumber(value)}
        onKeyPress={isNumber}
        onChange={(e) => {
          const value = e.target.value;
          setPriceSale(value.replace(/,/g, ""));
        }}
      />
    </div>
  );
};

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
export default function Sales() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [priceSale, setPriceSale] = useState(0);

  const getProductBySales = async () => {
    setLoading(true);
    try {
      const res = await ApiProduct.getProductBySales();
      setProduct(res);
      setPriceSale(0);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getProductBySales();
  }, []);
  const handleSaleUpdate = async (priceSale = 0, item) => {
    try {
      const res = await ApiProduct.toggleSale(priceSale, item._id);
      getProductBySales();
      message.success("Off sale successful");
    } catch (error) {}
  };

  return (
    <div className="layout-styles">
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col xs="24" span={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product by Sales"
            >
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
                          <Image
                            style={{ width: "230px", height: "150px" }}
                            src={c.image}
                          />

                          <h1>{c.title}</h1>
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
                                                s?.price * (c?.salePrice / 100)
                                            : c.price -
                                                c?.price * (c?.salePrice / 100)
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
                            <InfoCircleFilled style={{ color: "#0a5266" }} />
                          </Tooltip>
                          <p class="price">{`${formattedNumber(
                            c.price || 0
                          )}$`}</p>
                          <p>{c.type}</p>

                          <div className="button-flex">
                            <Popconfirm
                              title={
                                <InputPrice
                                  value={priceSale}
                                  setPriceSale={setPriceSale}
                                />
                              }
                              onConfirm={async () => {
                                if (Number(priceSale) > 100) {
                                  message.error(`The availabel input in 0-100`);
                                  return;
                                }
                                if (Number(priceSale) < 0) {
                                  message.error(`The availabel input in 0-100`);
                                  return;
                                }
                                try {
                                  const res = await ApiProduct.update(c._id, {
                                    salePrice: priceSale,
                                  });
                                  message.success("Update successful");
                                  getProductBySales();
                                } catch (error) {}
                              }}
                              onCancel={() => {
                                setPriceSale(0);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="warning">Edit</Button>
                            </Popconfirm>

                            <Button
                              ghost
                              danger
                              onClick={() => handleSaleUpdate(0, c)}
                            >
                              {" "}
                              Off Sales
                            </Button>
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
      </Spin>
    </div>
  );
}
