import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/auth";
export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
