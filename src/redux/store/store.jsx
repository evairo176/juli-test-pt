import { configureStore } from "@reduxjs/toolkit";
import global from "../slices/global";

const store = configureStore({
  reducer: {
    global: global,
  },
});

export default store;
