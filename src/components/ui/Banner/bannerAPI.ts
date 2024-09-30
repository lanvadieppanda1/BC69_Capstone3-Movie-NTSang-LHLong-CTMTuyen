import axios from "axios";

// Định nghĩa URL gốc của API
const BASE_URL = "http://movieapi.cyberlearn.vn/api";

// Tạo một hàm để gọi API lấy danh sách banner
export const getBanners = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/QuanLyPhim/LayDanhSachBanner`
    );
    return response.data.content; // Lấy phần dữ liệu "content" từ API trả về
  } catch (error) {
    console.error("Lỗi khi gọi API banner", error);
    throw error;
  }
};
