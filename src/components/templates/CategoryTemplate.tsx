import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "../../services/quanLyPhim";
import { Button, Card, Skeleton } from "antd";
import { sleep } from "../../utils";
import { Phim } from "../../@types";
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "../../constants"; // Đảm bảo import PATH

export const CategoryTemplate = () => {
  // Lấy danh sách phim
  const { data, isFetching } = useQuery({
    queryKey: ["DanhSachPhim"],
    queryFn: async () => {
      // Giả lập thời gian chờ
      await sleep(1000); // Giữ lại 1 giây
      return quanLyPhimServices.getDanhSachPhim("?maNhom=GP03");
    },
    staleTime: 5 * 60 * 1000, // Thời gian giữ lại dữ liệu cũ
    enabled: true, // Kích hoạt truy vấn
  });

  const navigate = useNavigate();

  // Hàm render danh sách phim
  const renderPhim = (data: Phim[] = []) => {
    return data.map((phim) => (
      <div key={phim.maPhim} className="col-3 mb-16 card-film">
        <Card
          className="card-img card"
          hoverable
          style={{ height: 450, width: "100%" }}
          cover={
            <img className="img-phim" alt={phim.tenPhim} src={phim.hinhAnh} />
          }
        >
          <div className="card-data">
            <Card.Meta title={phim.tenPhim} />
            <Button
              className="mt-10 mr-4 bg-red-500 border-0 text-white w-100"
              onClick={() => {
                const path = generatePath(PATH.phimDetail, {
                  id: phim.maPhim,
                });
                navigate(path);
              }}
            >
              Đặt vé
            </Button>
          </div>
        </Card>
      </div>
    ));
  };

  // Hiển thị loading nếu đang fetching
  if (isFetching) {
    return (
      <div className="grid grid-cols-4 gap-40 container">
        {[...Array(12)].map((_, index) => (
          <div key={index}>
            <Skeleton.Input active className="!h-[350px] !w-full" />
            <Skeleton.Input active className="mt-2 !w-full" />
            <Skeleton.Input active className="mt-2 !w-[80px]" />
          </div>
        ))}
        <p>Loading....</p>
      </div>
    );
  }

  // Kiểm tra và in ra dữ liệu
  console.log("data: ", data);

  return (
    <div className="container mx-auto py-10 px-6 lg:px-0 bg-black">
      <div className="lg:mt-[105px] md:text-[16px] text-[14px] md:pt-0">
        <h2 className="text-[35px] mb-9 text-4xl font-bold text-white">
          Danh Mục Phim
        </h2>
        <div className="row">{renderPhim(data?.data.content)}</div>
      </div>
    </div>
  );
};
