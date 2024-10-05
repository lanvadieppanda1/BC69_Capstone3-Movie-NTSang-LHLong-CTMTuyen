import { useSelector } from "react-redux";
import { RootState } from "..";

export const useQuanLyDatVeSelector = () =>
  useSelector((state: RootState) => state.quanLyDatVeReducer);
