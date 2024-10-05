import { useParams } from "react-router-dom";
import { useGetShowtimesById, usePhimDetailById } from "../../hooks/api";
import { Tabs, Collapse, Button, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { quanLyDatVe } from "../../services";
import { objectToQueryString } from "../../utils";
import { styled } from "styled-components";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; //
import "react-toastify/dist/ReactToastify.css";
import { quanLyDatVeActions } from "../../store/quanLyDatVe";
import { useQuanLyDatVeSelector } from "../../store/quanLyDatVe/selector";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";
import { GheComponent } from "../ui";

export const FimDetailTemplate = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [maLichChieu, setMaLichChieu] = useState<string | undefined>();
  const { id = "" } = useParams();
  console.log("id: ", id);

  const { data } = usePhimDetailById({ id });

  // Lấy chi tiết lịch chiếu phim

  const { data: showtimes } = useGetShowtimesById({ id });

  console.log("showtimes: ", showtimes);
  const {
    data: danhSachPhongVe,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["DanhSachPhongVe", maLichChieu],
    queryFn: () =>
      quanLyDatVe.layDanhSachPhongVe(
        objectToQueryString({
          MaLichChieu: maLichChieu,
        })
      ),
    enabled: !!maLichChieu,
  });

  let loading = !!danhSachPhongVe;

  console.log(danhSachPhongVe);

  const { listSeat } = useQuanLyDatVeSelector();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isComplete, setIsComplete] = useState<boolean>(false);
  let tong = 0;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleBookingComplete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsComplete(false);
      setConfirmLoading(false);
      setTimeout(() => {
        toast("Đặt vé thành công !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
        dispatch(quanLyDatVeActions.setClearSeat([]));
      }, 200);
    }, 2000);
  };

  return (
    <div className="bg-black  m-auto py-[50px] px-4">
      <div className=" relative bg-black flex justify-center w-full h-full detail__banner">
        <div className="relative detail__banner__custom_bg">
          <div className="detail__banner__img h-full">
            <img
              src={data?.hinhAnh}
              alt="..."
              className="w-[860px] h-full object-fill  duration-500 ease-in-out movie-banner "
              style={{}}
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

      {/* modal đặt vé */}
      <Modal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          setMaLichChieu(undefined);
        }}
        onOk={() => {
          setIsOpenModal(false);
          setIsComplete(true);
        }}
        okText="Đặt vé"
        cancelText="Huỷ"
        width={800}
        loading={!loading}
      >
        <h2 className="text-center text-[30px] font-semibold">Đặt vé</h2>
        <div className="grid md:grid-cols-12 grid-cols-6 gap-[10px] mt-4">
          {danhSachPhongVe?.data.content.danhSachGhe?.map((ghe) => (
            <GheComponent key={ghe.maGhe} ghe={ghe} />
          ))}
        </div>
        <ul className="flex mt-12 mb-5 space-x-4 justify-center">
          <li className="flex items-center">
            <span className="inline-block me-2 w-9 h-9 rounded-md bg-red-500"></span>
            Ghế Vip
          </li>
          <li className="flex items-center">
            <span className="inline-block me-2 w-9 h-9 rounded-md bg-slate-700"></span>
            Ghế Thường
          </li>
          <li className="flex items-center">
            <span className="inline-block me-2 w-9 h-9 rounded-md bg-blue-400"></span>
            Ghế Đang Chọn
          </li>
        </ul>
      </Modal>
      <Modal
        open={isComplete}
        onCancel={() => {
          setIsComplete(false);
        }}
        onOk={handleBookingComplete}
        confirmLoading={confirmLoading}
        okText="Hoàn thành"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <h2 className="text-center text-[30px] font-semibold mb-9">
          Thông tin vé đã đặt
        </h2>
        <div className="flex mb-5 text-[20px]">
          <span className="me-2">
            <strong>Tên phim : </strong>
          </span>
          <h3>{data?.tenPhim}</h3>
        </div>
        <table className="w-full border-collapse border">
          <thead>
            <th className="border">
              <strong>Tên ghế</strong>
            </th>
            <th className="border">
              <strong>Giá tiền</strong>
            </th>
          </thead>
          <tbody>
            {listSeat.map((item) => {
              tong += Number(item["giaVe"]);
              return (
                <tr key={item["maGhe"]} className="border">
                  <td className="border text-center p-2">{item["tenGhe"]}</td>
                  <td className="border text-center p-2">{item["giaVe"]}</td>
                </tr>
              );
            })}
          </tbody>
          <tr>
            <td className="text-center">
              <strong>Tổng tiền : {tong}</strong>
            </td>
          </tr>
        </table>
      </Modal>
    </div>
  );
};
