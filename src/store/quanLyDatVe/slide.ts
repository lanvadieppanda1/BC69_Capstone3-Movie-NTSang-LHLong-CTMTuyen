import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DanhSachGhe } from "../../@types";

// Định nghĩa state ban đầu
interface QuanLyDatVeState {
  listSeat: DanhSachGhe[];
}

const initialState: QuanLyDatVeState = {
  listSeat: [],
};

// Tạo slice với Redux Toolkit
export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } =
  createSlice({
    name: "quanLyDatVe",
    initialState,
    reducers: {
      // Thêm hoặc xóa ghế trong danh sách
      setListSeat: (state, action: PayloadAction<DanhSachGhe>) => {
        const index = state.listSeat.findIndex(
          (item) => item.maGhe === action.payload.maGhe
        );
        if (index === -1) {
          // Nếu ghế chưa có trong danh sách, thêm vào
          state.listSeat.push(action.payload);
        } else {
          // Nếu ghế đã tồn tại, xóa ghế đó
          state.listSeat.splice(index, 1);
        }
      },
      // Xóa toàn bộ danh sách ghế
      setClearSeat: (state, action: PayloadAction<DanhSachGhe[]>) => {
        state.listSeat = action.payload;
      },
    },
  });
