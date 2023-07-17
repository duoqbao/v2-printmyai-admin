import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  Typography,
  Button,
  Popconfirm,
  message,
  Col,
  Card,
} from "antd";
import { ModalCreate, ModalEdit } from "./component";
import ApiStyles from "api/styles";
import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";

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
const App = ({}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  const getDataById = (id) => {
    history.push({ pathname: `/category-styles/${id}/styles`, params: { id } });
  };

  const deleteData = async (id) => {
    try {
      await ApiStyles.deletCategoryById(id);
      message.success("Successfully deleted");
      getData();
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "32%",
      render: (item) => <Typography.Text strong>{item}</Typography.Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <div style={{ display: "flex", gap: "6px" }}>
            <ModalEdit
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              item={item}
            />

            <Button
              onClick={() => {
                setOpenEdit(true);
              }}
              type="primary"
              icon={<EditFilled />}
            />
            <Button
              onClick={() => {
                getDataById(item._id);
              }}
              type="primary"
              icon={<EyeOutlined />}
            />
            <Popconfirm
              title="Are You Sure?"
              onConfirm={() => {
                deleteData(item._id);
              }}
              onCancel={() => {}}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
    {
      key: "sort",
    },
  ];

  const getData = async () => {
    setLoading(true);
    const res = await ApiStyles.getList();
    setDataSource(
      res.map((item) => {
        return {
          ...item,
          key: item._id,
        };
      })
    );
    setLoading(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [fetchAfterSortComplete, setFetchAfterSortComplete] = useState(false);
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
      setFetchAfterSortComplete((prev) => !prev);
    }
  };

  useEffect(() => {
    getData();
  }, [openEdit, openAddModal]);

  useEffect(() => {
    (async () => {
      if (dataSource.length > 0) {
        try {
          await ApiStyles.sort(dataSource);
        } catch (err) {
          message.error("sort error");
        }
      }
    })();
  }, [fetchAfterSortComplete]);
  return (
    <div className="layout-styles">
      <ModalCreate open={openAddModal} onClose={() => setOpenAddModal(false)} />
      <Col xs={24} xl={24}>
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="Category"
        >
          <div
            style={{ display: "flex", justifyContent: "right", padding: 12 }}
          >
            <Button
              onClick={() => {
                setOpenAddModal(true);
              }}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add
            </Button>
          </div>
          <div className="table-responsive">
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={onDragEnd}
            >
              <SortableContext
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
                />
              </SortableContext>
            </DndContext>
          </div>
        </Card>
      </Col>
    </div>
  );
};
export default App;
