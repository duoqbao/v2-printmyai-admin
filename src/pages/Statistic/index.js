import { Col, Image, Popover, Row, Spin, Typography } from "antd";
import React, { useState, useEffect } from "react";
import CardStatistic from "./CardStatistic";
import Api from "../../api/styles";
export default function Statistic() {
  const [type, setType] = useState("today");
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await Api.statistic(type);
      let results = data.styles
        .filter((item) => item.categoryId)
        .map((style) => {
          let count =
            data.counters.filter((dataset) => dataset._id == style._id)[0]
              ?.count || 0;

          return {
            image:
              style.femaleExamples[0] ||
              style.maleExamples[0] ||
              style.coupleExamples[0],
            count,
            name: style.name,
            category: style.categoryId.name,
          };
        });
      setDataset(results.sort((a, b) => b.count - a.count));
      setLoading(false);
    })();
  }, [type]);

  return (
    <div>
      <Row justify={"space-around"} align="center">
        <CardStatistic
          type="Today"
          onClick={() => setType("today")}
          current={type}
        />
        <CardStatistic
          type="Week"
          onClick={() => setType("week")}
          current={type}
        />
        <CardStatistic
          type="Month"
          onClick={() => setType("month")}
          current={type}
        />
        <CardStatistic
          type="All"
          onClick={() => setType("all")}
          current={type}
        />
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: 500,
          overflowX: "scroll",
          margin: "10px 0px",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: 500,
            }}
          >
            <Spin />
          </div>
        ) : (
          <>
            {dataset.map((style) => {
              const content = (
                <div>
                  <span>
                    Category{" "}
                    <Typography.Text strong>{style.category}</Typography.Text>
                  </span>
                </div>
              );
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    margin: "2px 5px",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography.Text>{style.count}</Typography.Text>
                  <div
                    style={{
                      width: 30,
                      backgroundColor: "rgba(33, 148, 50,0.6)",
                      height: `${(style.count / dataset[0].count) * 100}%`,
                      minHeight: 5,
                    }}
                  />
                  <div
                    style={{
                      width: 30,
                      backgroundColor: "#fff",
                      height: `${
                        100 - (style.count / dataset[0].count) * 100
                      }%`,
                      minHeight: 5,
                    }}
                  />
                  <Popover
                    content={content}
                    title={
                      <Typography.Title level={5}>
                        {style.name}
                      </Typography.Title>
                    }
                  >
                    <Image src={style.image} width={50} preview={false} />
                  </Popover>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
