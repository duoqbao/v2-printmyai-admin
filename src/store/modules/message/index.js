import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      message.error(action.payload);
      return { messages: action.payload };
    },
    clearMessage: () => {
      return { messages: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
