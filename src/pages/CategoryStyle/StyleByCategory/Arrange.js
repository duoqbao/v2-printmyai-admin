import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Button, Drawer, Typography, Table, message } from "antd";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "api/styles";
import { useParams } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    key: "sort",
  },
];
const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === "sort") {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "move",
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
const App = ({ setRefetch }) => {
  const { categoryId } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await styles.getStyleByCategoryId(categoryId);
      let source = data.map((item, idx) => {
        return { ...item, key: item._id };
      });
      setDataSource(source);
    })();
  }, []);
  const [dataSource, setDataSource] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const onClose = async () => {
    setOpenList(false);
  };

  const confirmArrangement = async () => {
    setLoading(true);
    await styles.sortList(dataSource);
    setRefetch((prev) => !prev);
    setLoading(false);
    setOpenList(false);
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpenList(true)}>
        Arrange
      </Button>
      <Drawer
        title="Arrange"
        placement="right"
        onClose={onClose}
        open={openList}
        contentWrapperStyle={{ minWidth: 400 }}
      >
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: Row,
                },
              }}
              rowKey="key"
              columns={columns}
              dataSource={dataSource}
              pagination={{ position: ["none", "none"] }}
            />
          </SortableContext>
        </DndContext>
        <div
          style={{ marginTop: 50, display: "flex", justifyContent: "flex-end" }}
        >
          <Button type="primary" onClick={confirmArrangement} loading={loading}>
            Confirm
          </Button>
        </div>
      </Drawer>
    </>
  );
};
export default App;
