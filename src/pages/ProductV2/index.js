import React, { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import { useParams } from "react-router-dom";
import Api from "../../api";
import Products from "pages/Products";
import { Spin } from "antd";
export default function ProductV2() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await Api.get(`/ecommerc/products/${id}`);
      setData(data);
      if (data) {
        const uniqueArr = data.filter((obj, index, self) => {
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
    })();
  }, [id, forceReload]);

  return (
    <div>
      {loading ? (
        <Spin spinning={loading} />
      ) : (
        <>
          <Products
            handleForceReload={() => setForceReload((prev) => !prev)}
            types={types}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {data.map((item) => (
              <ProductItem
                key={item._id}
                listType={types}
                data={item}
                handleForceReload={() => setForceReload((prev) => !prev)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
