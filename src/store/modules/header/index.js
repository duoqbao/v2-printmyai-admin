import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:'',
};

const headerSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setTitleHeader: (state, action) => {
      return { title: action.payload };
    },
  },
});

const { reducer, actions } = headerSlice;

export const { setTitleHeader } = actions;
export default reducer;
