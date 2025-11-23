import { configureStore } from "@reduxjs/toolkit";
import webReducer from "./slices/webSlice";
import windowReducer from "./slices/windowSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    web: webReducer,
    windowWarning: windowReducer,
    user: userReducer,
  },
});
