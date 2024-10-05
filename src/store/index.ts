import { configureStore } from "@reduxjs/toolkit";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung";
import { useDispatch } from "react-redux";
import { quanLyDatVeReducer } from "./quanLyDatVe";

export const store = configureStore({
  reducer: {
    quanLyNguoiDungReducer,
    quanLyDatVeReducer,
  },
});

type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<(typeof store)["getState"]>;
