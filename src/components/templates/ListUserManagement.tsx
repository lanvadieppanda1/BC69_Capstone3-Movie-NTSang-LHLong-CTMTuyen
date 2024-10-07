import { Button, Input, Modal } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";
import { InfoUser } from "../../@types";
import { quanLyNguoiDungServices } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { sleep } from "../../utils";

export const ListUserManagement = () => {
  const { user } = useQuanLyNguoiDungSelector();

  const navigate = useNavigate();
  if (!user) navigate("/login");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // lấy danh sách phim
  const { data } = useQuery({
    queryKey: ["DanhSachNguoiDung"],
    queryFn: async () => {
      await sleep(1000);
      return quanLyNguoiDungServices.danhSachNguoiDung("MaNhom=GP03");
    },
    enabled: true,
  });

  const [textSearch, setTextSearch] = useState<InfoUser[] | undefined>([]);

  const inputSearchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length === 0) {
      setTextSearch([]);
      return;
    }
    const userSearch = data?.data.content.filter((item: InfoUser) =>
      item.taiKhoan.toLowerCase().trim().includes(value.toLowerCase().trim())
    );
    setTextSearch(userSearch);
  };

  // paginate
  const totalPost = data?.data.content.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const indexFirstPost = currentPage * postPerPage - postPerPage;
  const lastIndexPost = indexFirstPost + postPerPage;
  const listPost = data?.data.content.slice(indexFirstPost, lastIndexPost);

  return (
    <div className="sm:p-9 p-6 min-h-screen flex flex-col">
      <div className="flex flex-wrap justify-between md:mb-12 mb-5">
        <h2 className="text-white uppercase font-500 xl:text-[30px] md:text-[25px] text-[20px] mb-5 md:mb-0">
          Danh sách người dùng
        </h2>
        <Button className="py-3 hover:!bg-orange-400 hover:!text-white hover:!border-white" onClick={() => showModal()}>
          Thêm phim mới
        </Button>
      </div>
      <div className="mb-6">
      <input
          ref={inputSearchRef}
          type="search"
          placeholder="Tìm kiếm người dùng..."
          className="w-full adminInputSearch p-2"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <table className="w-full text-white">
        <thead>
          <tr className="xl:text-[16px] text-[12px]">
            <th className="py-3 px-2">TÀI KHOẢN</th>
            <th className="py-3 px-2">TÊN NGƯỜI DÙNG</th>
            <th className="py-3 px-2">EMAIL</th>
            <th className="py-3 px-2">SỐ ĐIỆN THOẠI</th>
            <th className="py-3 px-2">LOẠI NGƯỜI DÙNG</th>
            <th className="py-3 px-2">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-700 mb-2 xl:text-[16px] text-[12px]">
            <td>
              <div className="py-3 px-2 text-center">admin123</div>
            </td>
            <td>
              <div className="py-3 px-2">Hehehe</div>
            </td>
            <td>
              <div className="py-3 px-2">abc@gmail.com</div>
            </td>
            <td>
              <div className="py-3 px-2">0987654321</div>
            </td>
            <td>
              <div className="py-3 px-2 text-center">Quản trị</div>
            </td>
            <td>
              <div className="catalog__btns text-center">
                <Button
                  className="catalog__btn--banned me-2
                ">
                  <i className="fa-solid fa-pen"></i>
                </Button>
                <Button className="catalog__btn--delete">
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        title={<h3 className="text-center text-[25px] mb-2">Thêm phim mới</h3>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className="flex flex-wrap">
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Tài khoản</p>
            <Input placeholder="Tài khoản" />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Mật khẩu</p>
            <Input placeholder="Mật khẩu" />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Email</p>
            <Input placeholder="Email" />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Số điện thoại</p>
            <Input placeholder="Số điện thoại" />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Mã nhóm</p>
            <Input placeholder="Mã nhóm" />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Loại người dùng</p>
            <Input placeholder="Loại người dùng" />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Họ tên</p>
            <Input placeholder="Họ tên" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
