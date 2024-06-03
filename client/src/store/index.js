import { configureStore } from "@reduxjs/toolkit";
import posts from "./slices/posts";

export const store = configureStore({
  reducer: {
    posts,
  },
});

