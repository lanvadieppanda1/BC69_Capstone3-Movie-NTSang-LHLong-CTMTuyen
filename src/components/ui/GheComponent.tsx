import { styled } from "styled-components";
import { LoaiGhe, DanhSachGhe } from "../../@types"; // Chỉ cần import đúng
import { useState } from "react";
import { useDispatch } from "react-redux";
import { quanLyDatVeActions } from "../../store/quanLyDatVe";

type Props = {
  ghe: DanhSachGhe;
};

export const GheComponent = (props: Props) => {
  const { ghe } = props;

  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  // Tạo lớp CSS cho ghế
  let className = "cursor-pointer ";

  if (ghe.daDat) className += "daDat ";
  if (ghe.loaiGhe === LoaiGhe.THUONG) className += "gheThuong "; // Đổi thành `ghe.loaiGhe`
  if (ghe.loaiGhe === LoaiGhe.VIP) className += "gheVip "; // Sử dụng đúng `ghe.loaiGhe`
  if (isActive) className += "active ";
  console.log("====", ghe, className);
  return (
    <Ghe
      key={ghe.maGhe}
      className={className.trim()} // Sử dụng trim() để loại bỏ khoảng trắng thừa
      onClick={() => {
        setIsActive(!isActive);
        console.log("🚀 ~ GheComponent ~ ghe:", ghe);
        dispatch(quanLyDatVeActions.setListSeat(ghe));
      }}
    >
      {ghe.tenGhe}
    </Ghe>
  );
};

// style
const Ghe = styled.div`
  width: 50px;
  height: 50px;
  background-color: #b8deff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 6px;

  &.gheThuong {
    background: #334155;
  }

  &.gheVip {
    background: #ef4444;
  }

  &.active {
    background: #71c6f8;
  }
`;
