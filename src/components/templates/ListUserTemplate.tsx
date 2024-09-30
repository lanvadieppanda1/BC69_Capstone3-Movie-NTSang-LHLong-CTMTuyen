import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";

export const ListUserTemplate = () => {
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

  return (
    <div className="sm:p-9 p-6 min-h-screen flex flex-col">
      <div className="flex flex-wrap justify-between md:mb-12 mb-5">
        <h2 className="text-white uppercase font-500 xl:text-[30px] md:text-[25px] text-[20px] mb-5 md:mb-0">
          Danh sách người dùng
        </h2>
        <Button
          className="py-5 hover:!bg-orange-400 hover:!text-white hover:!border-white"
          onClick={() => showModal()}>
          Thêm người dùng mới
        </Button>
      </div>
      <div className="mb-6">
        <Input.Search
          placeholder="Tìm người dùng..."
          className="w-full adminInputSearch"
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
