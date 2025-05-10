import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../components/Features/eventSlice";

export const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});