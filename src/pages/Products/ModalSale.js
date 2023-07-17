import React, { useEffect, useState } from "react";
import { Modal, Input, message } from "antd";
export default function ModalSale(props) {
  const { isOpen, item, setOpen, setItem, handleSaleUpdate } = props;
  const [salePrice, setSalePrice] = useState(0);
  useEffect(() => {
    setSalePrice(0);
  }, [isOpen, item]);
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
  const submitSale = () => {
    if (Number(salePrice) > 100) {
      message.error(`Price Sale can in range 0-100 %`);
      return;
    }
    if (Number(salePrice) < 0) {
      message.error("Price Sale cannot be less than 0");
      return;
    }
    handleSaleUpdate(parseFloat(salePrice), item);
  };
  return (
    <Modal
      visible={isOpen}
      onCancel={() => {
        setItem({});
        setOpen(false);
      }}
      onOk={submitSale}
    >
      <div className="input">
        <label>Price Sales</label>
        <Input
          value={formattedNumber(salePrice || 0)}
          onKeyPress={isNumber}
          // max={100}
          // min={0}
          prefix="%"
          onChange={(e) => {
            const value = e.target.value;
            setSalePrice(value.replace(/,/g, ""));
          }}
        />
      </div>
    </Modal>
  );
}
