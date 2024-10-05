export type LoginAPIResponse = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
};

export type RegisterAPIResponse = {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
};

export interface TicketedAPIResponse {
    danhSachGhe: DanhSachGheVe[];
  }
  export interface DanhSachGheVe {
    maHeThongRap: string;
    tenHeThongRap: string;
    maCumRap: string;
    tenCumRap: string;
    maRap: number;
    tenRap: string;
    maGhe: number;
    tenGhe: string;
  }