import { Card, Col, Typography } from "antd";
import Api from "../../api/styles";
import React, { useState, useEffect } from "react";

export default function CardStatistic({ type, onClick = () => {}, current }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await Api.statistic(type.toLowerCase());
      let sum = data.counters.reduce((sum, a) => sum + a.count, 0);
      setCounter(sum);
    })();
  }, [type]);

  return (
    <Card
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: 10,
        backgroundColor: current == type.toLowerCase() ? "#498adf" : "#fff",
        borderRadius: 15,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "0px 10px",
        maxWidth: 200,
      }}
    >
      <Typography.Title
        style={{ textAlign: "center", color: "#eee" }}
        level={5}
      >
        {type}
      </Typography.Title>
      <Typography.Title
        style={{ textAlign: "center", color: "#eee" }}
        level={5}
      >
        {counter} generates
      </Typography.Title>
    </Card>
  );
}
