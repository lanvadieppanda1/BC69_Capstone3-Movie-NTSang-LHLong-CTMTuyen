export interface DanhSachPhongVe {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}

export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}

export enum LoaiGhe {
  THUONG = "Thuong",
  VIP = "Vip",
}

export interface DanhSachGhe {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
  giaVe: number;
  daDat: boolean; // Thêm thuộc tính này
  loaiGhe: LoaiGhe; // Thêm nếu chưa có
}
