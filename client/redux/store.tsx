import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    user: UserInfoSlice,
  },
});

import { useDispatch as useReduxDispatch } from "react-redux";
import UserInfoSlice from "./UserInfoSlice";

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;