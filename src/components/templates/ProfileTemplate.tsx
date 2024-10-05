import {
  Button,
  Input,
  Modal,
  Card,
  Descriptions,
  message,
  Row,
  Col,
} from "antd";
import { useState } from "react";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";
import { NavLink } from "react-router-dom";

export const ProfileTemplate = () => {
  const { user } = useQuanLyNguoiDungSelector();

  if (!user) return <p>Đang tải thông tin người dùng...</p>;

  const [formData, setFormData] = useState({
    hoTen: user.hoTen,
    taiKhoan: user.taiKhoan,
    soDT: user.soDT,
    email: user.email,
    maLoaiNguoiDung: user.maLoaiNguoiDung,
    maNhom: user.maNhom,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    message.success("Cập nhật thông tin thành công!");
    closeModal();
  };

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <Card
        title="Thông tin người dùng"
        bordered={false}
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions column={1}>
              <Descriptions.Item label="Họ tên">{user.hoTen}</Descriptions.Item>
              <Descriptions.Item label="Tài khoản">
                {user.taiKhoan}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions column={1}>
              <Descriptions.Item label="Số điện thoại">
                {user.soDT}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions column={1}>
              <Descriptions.Item label="Chức vụ">
                {user.maLoaiNguoiDung}
              </Descriptions.Item>
              <Descriptions.Item label="Mã nhóm">
                {user.maNhom}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="primary"
            onClick={showModal}
            className="hover:bg-red-400"
          >
            Sửa thông tin
          </Button>
          <NavLink
            to="/"
            className="py-2 px-3 border rounded-md border-orange-400 bg-white hover:bg-blue-500 text-blue-500 hover:text-blue transition-all"
          >
            <i className="fa-solid fa-backward-step text-[15px] me-2 w-[15px] text-center"></i>
            <span className="xl:inline-block">Về trang chủ</span>
          </NavLink>
        </div>
      </Card>

      {/* Modal chỉnh sửa thông tin */}
      <Modal
        title="Sửa thông tin tài khoản"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" type="dashed" danger onClick={closeModal}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Xác nhận
          </Button>,
        ]}
      >
        <div>
          <Input
            name="hoTen"
            placeholder="Họ tên"
            value={formData.hoTen}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <Input
            name="taiKhoan"
            placeholder="Tài khoản"
            value={formData.taiKhoan}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <Input
            name="soDT"
            placeholder="Số điện thoại"
            value={formData.soDT}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <Input
            name="maNhom"
            placeholder="Mã nhóm"
            value={formData.maNhom}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <Input
            name="maLoaiNguoiDung"
            placeholder="Loại người dùng"
            value={formData.maLoaiNguoiDung}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </Modal>
    </div>
  );
};
