import {
  InfoCircleFilled,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tooltip,
  Image,
  Typography,
  message,
  Modal,
  Popconfirm,
  Select,
  Col,
  Input,
  AutoComplete,
  Spin,
  Popover,
} from "antd";
import React, { useEffect, useState } from "react";
import ModalSale from "pages/Products/ModalSale";
import Api from "../../../api";
import { uploadImage } from "api/upload";
import ChangeSize from "pages/Products/ChangeSize";
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
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};

export default function ProductItem({ data, handleForceReload, listType }) {
  const [currentProduct, setCurrentProduct] = useState(data);

  const [isOnSale, setIsOnSale] = useState(false);
  const [isHandlingSale, setIsHandlingSale] = useState(false);
  const confirmUploadSale = async (priceSale, item) => {
    try {
      setIsHandlingSale(true);
      const data = await Api.put(
        `/ecommerc/products/${currentProduct._id}/sale`,
        {
          salePrice: priceSale,
        }
      );
      setCurrentProduct({ ...data });
      setIsOnSale(false);
    } catch (err) {
      message.error("Error");
    } finally {
      setIsHandlingSale(false);
    }
  };
  const confirmTurnOfSale = async () => {
    try {
      setIsHandlingSale(true);
      const data = await Api.put(
        `/ecommerc/products/${currentProduct._id}/sale`,
        {
          salePrice: 0,
        }
      );
      setCurrentProduct({ ...data });
    } catch (err) {
      message.error("Error");
    } finally {
      setIsHandlingSale(false);
    }
  };
  const deleteProduct = async () => {
    try {
      await Api.delete(`ecommerc/products/${currentProduct._id}/detail`);
      message.success("Deleted product");
      handleForceReload();
    } catch (err) {
      message.error("Delete failed, errors");
    }
  };
  const confirmUpdateProduct = async (e) => {
    await Api.put(`ecommerc/products/${currentProduct._id}/detail`, {
      ...e,
      sizes: !e?.sizes[0].options?.color
        ? [...e.sizes]
        : e.sizes.filter((i) => i.options.color == e?.color),
    });
    handleForceReload();
    setOpenModalDetail(false);
  };

  const [openModalDetail, setOpenModalDetail] = useState(false);

  const [loadingProvider, setLoadingProvider] = useState(false);

  const [providers, setProviders] = useState(
    currentProduct?.printProvider ? [currentProduct.printProvider] : []
  );
  const loadProviderPrintify = async () => {
    setLoadingProvider(true);
    const data = await Api.get(
      `/ecommerc/products/${currentProduct.id}/print-providers`
    );
    setProviders(data);
    setLoadingProvider(false);
  };

  return (
    <div
      style={{
        margin: 15,
        borderRadius: 10,
        backgroundColor: "#eee",
        padding: 10,
        width: 250,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image
          src={currentProduct.image}
          style={{ maxWidth: 200, borderRadius: 20 }}
        />
        <Typography.Text strong style={{ color: "green", fontSize: 20 }}>
          $ {currentProduct.price}
        </Typography.Text>
        <Typography.Text strong style={{ fontSize: 16, textAlign: "center" }}>
          {currentProduct.title}
        </Typography.Text>
        <Typography.Text strong style={{ color: "gray" }}>
          {currentProduct.type}
        </Typography.Text>
        <div>
          {currentProduct.onSale && (
            <>
              <Typography.Text style={{ color: "#ff4d4f" }} strong>{`-${
                formattedNumber(currentProduct.salePrice || 0) || 0
              }%     `}</Typography.Text>
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
                    {currentProduct.sizes.map((s) => (
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
                                    s?.price * (currentProduct.salePrice / 100)
                                : currentProduct.price -
                                    currentProduct.price *
                                      (currentProduct.salePrice / 100)
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
                            {s?.price ? s?.price : currentProduct.price} $
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              >
                <InfoCircleFilled style={{ color: "#0a5266" }} />
              </Tooltip>
            </>
          )}
        </div>
        {currentProduct.onSale ? (
          <>
            <Button
              style={{
                margin: `10px 0`,
                background: "#eca52b",
                border: "none",
              }}
              disabled={isHandlingSale}
              onClick={confirmTurnOfSale}
              loading={isHandlingSale}
              type="primary"
            >
              Turn off sale
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{
                margin: `10px 0`,
                background: "#28a745",
                border: "none",
              }}
              disabled={isHandlingSale}
              loading={isHandlingSale}
              type="primary"
              onClick={() => setIsOnSale(true)}
            >
              Apply sale
            </Button>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: `10px 0`,
        }}
      >
        <Button
          type="primary"
          style={{ flex: 1, margin: `0 10px` }}
          onClick={async () => {
            await loadProviderPrintify();
            setOpenModalDetail(true);
          }}
          loading={loadingProvider}
        >
          {" "}
          Edit
        </Button>
        <Popconfirm
          onConfirm={() => deleteProduct()}
          title="Delete this product ?"
        >
          <Button
            danger
            type="primary"
            style={{ flex: 1, margin: `0 10px` }}
            icon={<DeleteOutlined style={{ fontSize: 16 }} />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
      <ModalSale
        isOpen={isOnSale}
        setOpen={setIsOnSale}
        item={data}
        handleSaleUpdate={confirmUploadSale}
      />
      <ProductDetailModal
        types={listType}
        defaultValue={currentProduct}
        open={openModalDetail}
        updateToUI={(e) => setCurrentProduct(e)}
        onClose={() => setOpenModalDetail(false)}
        confirmUpdateProduct={confirmUpdateProduct}
        providers={providers}
        loadingProvider={loadingProvider}
      />
    </div>
  );
}

const ProductDetailModal = ({
  open,
  onClose,
  defaultValue = {},
  types = [],
  confirmUpdateProduct,
  loadingProvider = true,
  providers = [],
}) => {
  const [currentProduct, setCurrentProduct] = useState({ ...defaultValue });
  const [imageProduct, setImageProduct] = useState(defaultValue?.image || "");
  const [imageSize, setImageSize] = useState(defaultValue?.sizeImage || "");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      maskClosable={false}
      style={{ minWidth: "90vw", padding: `0px 20px` }}
      onOk={() => {
        confirmUpdateProduct({
          ...currentProduct,
          image: imageProduct,
          sizeImage: imageSize,
        });
      }}
    >
      <Col style={{ marginTop: 20 }}>
        <Typography.Text>Name</Typography.Text>
        <Input
          value={currentProduct.title}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, title: e.target.value })
          }
        />
      </Col>
      <Col style={{ marginTop: 20 }}>
        <Typography.Text>Product Image</Typography.Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            style={{ flex: 1 }}
            value={imageProduct}
            onChange={(e) => setImageProduct(e.target.value)}
          />
          <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageProduct && (
              <Image
                src={imageProduct}
                style={{ maxWidth: 120, borderRadius: 10 }}
              />
            )}
            <UploadImageNative
              htmlId={`editting-image-product-${currentProduct._id}`}
              onChange={(e) => setImageProduct(e)}
            />
          </div>
        </div>
      </Col>
      <Col span={24}>
        <div className="input">
          <label>Type for product</label>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={250}
            style={{ width: "100%" }}
            options={types}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(e) => setCurrentProduct({ ...currentProduct, type: e })}
            onChange={(e) => setCurrentProduct({ ...currentProduct, type: e })}
            value={currentProduct.type}
          >
            <Input placeholder="input here" />
          </AutoComplete>
        </div>
      </Col>
      <Col span={24}>
        <div className="input">
          <label>Base price</label>
          <Input
            prefix={`$`}
            value={formattedNumber(currentProduct.price || 0)}
            onKeyPress={isNumber}
            onChange={(e) => {
              const value = e.target.value;
              const temp = { ...currentProduct };
              temp.price = value.replace(/,/g, "");
              setCurrentProduct(temp);
            }}
          />
        </div>
      </Col>
      <Col span={24}>
        <div className="input">
          <Typography.Text strong>Size chart</Typography.Text>
          <div>
            {imageSize && (
              <Image
                src={imageSize}
                style={{ maxWidth: 120, borderRadius: 10 }}
              />
            )}
            <UploadImageNative
              htmlId={`editting-image-sizechart-${currentProduct._id}`}
              onChange={(e) => setImageSize(e)}
            />
          </div>
        </div>
      </Col>
      <Col span={24} style={{ marginTop: 20 }}>
        <div className="input">
          <label>Provider </label>
          <Select
            loading={loadingProvider}
            style={{ width: "100%" }}
            value={currentProduct?.printProvider?.id}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            optionFilterProp="children"
            showSearch
            onChange={(e) => {
              const temp = providers.find((item) => item.id === e);
              if (temp) {
                const printProvider = {
                  name: temp.title,
                  address:
                    temp.location && temp.location?.address1
                      ? temp.location?.address1
                      : temp.location?.address2,
                  id: e,
                };
                setCurrentProduct({
                  ...currentProduct,
                  printProvider: printProvider,
                  color: "",
                  hexColor: "",
                  sizes: [],
                });
              }
            }}
          >
            {providers.map((provider, index) => {
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
      <Col>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col span={24}>
            <ChangeSize
              basePrice={currentProduct?.price}
              id={currentProduct.id}
              idProvider={currentProduct?.printProvider?.id}
              setDataVariants={setCurrentProduct}
              variants={currentProduct}
            />
          </Col>
        </div>
      </Col>
    </Modal>
  );
};
const UploadImageNative = ({ onChange, htmlId }) => {
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
        id={`fileUpload-${htmlId}`}
        type="file"
        accept="image/*"
        onChange={handleFileEvent}
        style={{ display: "none" }}
      />
      {loading ? (
        <Spin spinning indicator={<LoadingOutlined />} />
      ) : (
        <label htmlFor={`fileUpload-${htmlId}`}>
          <a className={`btn btn-primary `}>Upload Files</a>
        </label>
      )}
    </div>
  );
};
