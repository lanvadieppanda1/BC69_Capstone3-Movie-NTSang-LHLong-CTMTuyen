import { useParams } from "react-router-dom";
import { useGetShowtimesById, usePhimDetailById } from "../../hooks/api";
import { Tabs, Collapse, Button, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { quanLyDatVe } from "../../services";
import { objectToQueryString } from "../../utils";
import cn from "classnames";
import { styled } from "styled-components";
import { LoaiGhe } from "../../@types";
export const FimDetailTemplate = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [maLichChieu, setMaLichChieu] = useState<string | undefined>();
  const { id = "" } = useParams();
  console.log("id: ", id);

  const { data } = usePhimDetailById({ id });

  // Lấy chi tiết lịch chiếu phim

  const { data: showtimes } = useGetShowtimesById({ id });

  console.log("showtimes: ", showtimes);
  const { data: danhSachPhongVe } = useQuery({
    queryKey: ["DanhSachPhongVe", maLichChieu],
    queryFn: () =>
      quanLyDatVe.layDanhSachPhongVe(
        objectToQueryString({
          MaLichChieu: maLichChieu,
        })
      ),
    enabled: !!maLichChieu,
  });
  console.log(danhSachPhongVe);

  return (
    <div className="bg-black  m-auto py-[50px] px-4">
      <div className=" relative bg-black flex justify-center w-full h-full detail__banner">
        <div className="relative detail__banner__custom_bg">
          <div className="detail__banner__img h-full">
            <img
              src={data?.hinhAnh}
              alt="..."
              className="w-[860px] h-full object-fill  duration-500 ease-in-out movie-banner "
              style={{ width: "100vw", height: "500px" }}
            />
          </div>
        </div>
      </div>

      <div className=" container mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-8 px-4">
        <div className="lg:w-1/3 mb-6 lg:mb-0 ">
          <img
            src={data?.hinhAnh}
            alt="..."
            className="img-thumbnail rounded-lg w-full"
          />
        </div>
        <div className="lg:w-2/3 text-white sm:px-9 px-0 ">
          <p className="flex items-center space-x-4 text-gray-400 mb-4">
            <h3 className="text-blue-400 text-3xl">{data?.tenPhim}</h3>
            <span>Đánh giá</span> :{" "}
            <span className="text-blue-400 text-lg">{data?.danhGia} / 10</span>
          </p>
          <p className="mb-10">
            <span>Ngày khởi chiếu</span> :{" "}
            <span className="text-blue-400">
              {dayjs(data?.ngayKhoiChieu).format("DD-MM-YYYY")}
            </span>
          </p>
          <p className="mb-10">
            <span>Mã phim</span> :{" "}
            <span className="text-blue-400">{data?.maPhim}</span>
          </p>
          <div>
            {" "}
            <span>Mô tả phim</span> : <p>{data?.moTa.slice(0, 350)}...</p>
          </div>
        </div>
      </div>

      {/* tab  */}
      <div className="text-white h-full  container mb-8">
        <Tabs
          items={showtimes?.heThongRapChieu.map((item) => ({
            key: item?.maHeThongRap,
            label: <div className="uppercase">{item?.tenHeThongRap}</div>,
            children: (
              <div>
                <Collapse
                  items={item?.cumRapChieu.map((cumRap) => ({
                    key: cumRap.maCumRap,
                    label: (
                      <div>
                        <p className="font-600 text-[16px] text-white">
                          {cumRap.tenCumRap}
                        </p>
                        <p className="text-[14px] italic">{cumRap.diaChi}</p>
                      </div>
                    ),
                    children: (
                      <div className="flex gap-10 flex-wrap">
                        {cumRap.lichChieuPhim.map((lichChieu) => (
                          <Button
                            type="primary"
                            onClick={() => {
                              setIsOpenModal(true);
                              setMaLichChieu(lichChieu.maLichChieu);
                            }}
                          >
                            {dayjs(lichChieu.ngayChieuGioChieu).format(
                              "DD-MM-YYYY, HH:mm"
                            )}{" "}
                            -
                            {dayjs(lichChieu.ngayChieuGioChieu)
                              .add(lichChieu.thoiLuong, "minutes")
                              .format("HH:mm")}
                          </Button>
                        ))}
                      </div>
                    ),
                  }))}
                />
              </div>
            ),
          }))}
        />
      </div>

      {/* Modal đặt vé */}
      <Modal
        open={isOpenModal}
        width={800}
        onCancel={() => {
          setIsOpenModal(false);
          setMaLichChieu(undefined);
        }}
      >
        {/* Nội dung Modal, hiện số ghế đặt vé */}
        Đặt vé
        <div className="grid grid-cols-12 gap-[10px] mt-20">
          {danhSachPhongVe?.data.content?.danhSachGhe?.map((ghe) => (
            <Ghe
              className={cn({
                daDat: ghe.daDat,
                gheThuong: ghe.loaiGhe === LoaiGhe.THUONG,
                gheVip: ghe.loaiGhe === LoaiGhe.VIP,
              })}
            >
              {ghe.tenGhe}
            </Ghe>
          ))}
        </div>
      </Modal>
    </div>
  );
};
//Styled-------------------------------------
const Ghe = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  color: wheat;
  justify-content: center;
  border-radius: 6px;
  background: red;
  &.gheThuong {
    background: #116;
  }
  &.gheVip {
    background: red;
  }
`;

// map có thể bỏ return bằng cách map((item)=>({}))
// dùng tab, collapse của ant.design
// dùng tab, Acod của MUI
// muốn dùng scss thì phải cài npm i sass
// hoặc dùng style css
// cài npm j dayjs để format time
