import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Empty } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./index.scss";

const OwlComponent = (props) => {
  const carousel = React.useRef(null);
  const { items, indexExamples, editImageItem, options, dataEdit } =
    props;
  const [owlOption, setOwlOption] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    setOwlOption(options);
    setData(items);
  }, [items,dataEdit]);
  const editImage = (item, indexExamples, index) => {
    editImageItem(item, indexExamples, index);
  };
  const Items = items.map((item, index) => {
    return (
      <Col
        span={12}
        key={index}
        onClick={() => editImage(item, indexExamples, index)}
        className="item-edit"
      >
        <Card
          className="card-billing-info card-project"
          bordered={false}
          cover={
            <img alt="example" style={{ width: 200 }} src={item.url_sample} />
          }
          style={{ padding: 24 }}
        >
          <div className="col-info">
            <h5>{item?.metadata?.name}</h5>
            <p>{item?.metadata?.text}</p>
          </div>
        </Card>
      </Col>
    );
  });
  return (
    <>
      {" "}
      {items.length === 0 ? (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Empty />
        </div>
      ) : (
        <div className="owl-custom">
          <OwlCarousel
            ref={carousel}
            id="customer-testimonoals"
            className="owl-carousel owl-theme"
            {...owlOption}
            dots
          >
            {Items}
          </OwlCarousel>
          <div className="owl-nav-button">
            <Button
              onClick={() => carousel.current.prev()}
              icon={<LeftOutlined />}
            ></Button>
            <Button
              onClick={() => carousel.current.next()}
              icon={<RightOutlined />}
            ></Button>
          </div>
        </div>
      )}
    </>
  );
};
export default OwlComponent;
