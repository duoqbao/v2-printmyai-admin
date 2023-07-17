import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "service/auth.serviec";
import { setMessage } from "../message/index";

const admin = localStorage.getItem("Bearer");
export const adminLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { token } = await login({ email, password });
      if (token) {
        localStorage.setItem("Bearer", token);
      }
      return { admin: "" };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const Logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("Bearer");
});
const initialState = {
  isLoggedIn: admin ? true : false,
  admin: admin,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.admin = action.payload.admin;
        state.loading = false;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
        state.loading = false;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
      });
  },
});
const { reducer } = authSlice;
export default reducer;
