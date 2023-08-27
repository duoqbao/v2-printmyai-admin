import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Divider,
  Row,
  Col,
  Spin,
  Select,
  Popover,
  Input,
  Button,
} from "antd";
import { SketchPicker } from "react-color";

import ProductApi from "api/product";
import convert from "color-convert";

import "./index.scss";

export default function ChangeSize(props) {
  const { id, setDataVariants, idProvider, variants, basePrice } = props;
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [hexColor, setHexColor] = useState("#000");
  const [loading, setLoading] = useState(false);
  const [isCheckColor, setIsCheckColor] = useState(false);
  const onChange = (item, listSize) => {
    let sizes = variants.sizes;
    let checkedItem = listSize.filter((s) => s.id == item.id)[0];
    if (item.checked) {
      let removeDuplicate = sizes.filter((s) => s.id != item.id);
      let result = [...removeDuplicate, { ...checkedItem, price: item.price }];
      setDataVariants({ ...variants, sizes: result });
    } else {
      let removed = sizes.filter((s) => s.id != item.id);
      setDataVariants({ ...variants, sizes: removed });
    }
  };
  const convertData = (products) => {
    const groupedBySize = Object.entries(
      products.reduce((result, product) => {
        const color = product.options.color;
        if (!result[color]) {
          result[color] = [];
        }
        result[color].push(product);
        return result;
      }, {})
    ).map(([color, list]) => ({
      color: color,
      list: list,
      [`${color}ed`]: [],
    }));
    if (groupedBySize.length === 1 && groupedBySize[0].color === "undefined") {
      setIsCheckColor(true);
      setDataVariants({
        ...variants,
        color: "undefined",
      });
    }
    if (variants.sizes && variants.sizes.length > 0) {
      const temp = [...groupedBySize];
      temp.map((item) => {
        if (item.color === variants.color) {
          item[`${item.color}ed`] = variants.sizes;
        }
        return {
          ...item,
        };
      });
      setData(temp);
    } else {
      setData(groupedBySize);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      if (id && idProvider) {
        const res = await ProductApi.getVariantsByProvider(id, idProvider);
        if (res) {
          convertData(res.variants);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getData();
    setHexColor(variants.hexColor);
  }, [idProvider]);

  return (
    <Spin spinning={loading}>
      <div className="product">
        <Row gutter={[12, 12]}>
          <Col span={12} className="mb-24" hidden={isCheckColor}>
            <div className="input">
              <label>Color</label>
              <Select
                style={{ width: "100%" }}
                value={variants.color}
                onChange={(e) => {
                  let hex = "000";
                  // if (e.split(" ").length > 1) {
                  //   const temp = e.split(" ");
                  //   hex = convert.keyword.hex(temp[1].toLowerCase());
                  //   setHexColor(`#${hex}`);
                  // } else {
                  //   hex = convert.keyword.hex(e);
                  // }
                  setHexColor(`#${hex}`);
                  setDataVariants({
                    ...variants,
                    color: e,
                    hexColor: `#${hex}`,
                  });
                }}
              >
                {data.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.color}>
                      {item.color}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </Col>
          <Col span={12} className="mb-24" hidden={isCheckColor}>
            <div className="input">
              <label>Color Hex:</label>
              <Popover
                content={
                  <SketchPicker
                    color={hexColor}
                    onChangeComplete={(newColor) => {
                      setHexColor(newColor.hex);
                      setDataVariants({ ...variants, hexColor: newColor.hex });
                    }}
                  />
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <Input
                  className="customHeightInput"
                  value={hexColor}
                  prefix={
                    <div
                      style={{
                        backgroundColor: `${hexColor}`,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                      }}
                    ></div>
                  }
                />
              </Popover>
            </div>
          </Col>
          <Col span={24} hidden={!variants.color && !isCheckColor}>
            <div className="input">
              <label>Size</label>{" "}
              <div>
                {data.map((item, index) => {
                  return (
                    <div
                      key={item.color}
                      hidden={variants.color !== item.color}
                    >
                      {item.list.map((c) => {
                        let { sizes } = variants;
                        let existed = sizes.filter((s) => s.id == c.id)[0];
                        return (
                          <SizeAndPriceOptions
                            id={c.id}
                            item={c}
                            defaultPrice={existed?.price || basePrice}
                            defaultChecked={existed}
                            size={c?.options?.size}
                            onChange={(e) => {
                              onChange(e, item.list);
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

const SizeAndPriceOptions = ({
  id,
  onChange,
  size,
  defaultPrice,
  defaultChecked,
}) => {
  const [value, setValue] = useState({
    id: null,
    price: parseFloat(defaultPrice),
  });
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div
      style={{
        marginTop: 10,
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Checkbox
        value={value.id}
        checked={checked}
        onChange={() => {
          setChecked((prev) => !prev);
          onChange({ id, price: parseFloat(value.price), checked: !checked });
        }}
        style={{ width: 100 }}
      >
        {size}
      </Checkbox>
      <Input
        type={"number"}
        prefix="$"
        onChange={(e) => {
          setValue({ ...value, price: parseFloat(e.target.value) });
        }}
        defaultValue={value.price}
        value={value.price}
        disabled={!checked}
        onBlur={() => {
          if (checked)
            onChange({ id, price: parseFloat(value.price), checked });
        }}
        style={{ width: 200 }}
      />
    </div>
  );
};
