import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/index";
import headerReducer from "./modules/header/index";
import user from "./modules/user/index";
const reducer = {
  auth: authReducer,
  header: headerReducer,
  user: user,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
