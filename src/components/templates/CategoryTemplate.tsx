import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "../../services/quanLyPhim";
import { Button, Card, Skeleton } from "antd";
import { sleep } from "../../utils";
import { Phim } from "../../@types";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const CategoryTemplate = () => {
  // Lấy danh sách phim
  const { data, isFetching } = useQuery({
    queryKey: ["DanhSachPhim"],
    // queryFn: () => quanLyPhimServices.getDanhSachPhim('?maNhom=GP01'),
    queryFn: async () => {
      await sleep(1000 * 1);
      return quanLyPhimServices.getDanhSachPhim("?maNhom=GP03");
    },

    staleTime: 5 * 60 * 1000,

    enabled: true,
  });
  const navigate = useNavigate();

  const renderPhim = (data: Phim[] = []) => {
    return data.map((phim) => {
      return (
        <div key={phim.maPhim} className="col-3 mb-16 card-film ">
          <Card
            className="card-img"
            hoverable
            style={{ height: 450, width: "100%", textAlign: "left" }}
            cover={<img alt="example" src={phim.hinhAnh} />}
          >
            <div className="card-data ">
              <Card.Meta
                title={phim.tenPhim}
                className="card-data"
                style={{}}
              />
              <p>{phim?.moTa}</p>
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
      );
    });
  };

  if (isFetching) {
    return (
      <div className="grid grid-cols-4 gap-40 container">
        {[...Array(12)].map(() => {
          return (
            <div>
              <Skeleton.Input active className="!h-[350px] !w-full" />
              <Skeleton.Input active className="mt-2 !w-full" />
              <Skeleton.Input active className="mt-2 !w-[80px]" />
            </div>
          );
        })}
        Loading....
      </div>
    );
  }

  console.log("data: ", data);

  return (
    <div className="container mx-auto py-10 px-6 lg:px-0 bg-black  ">
      <div className=" lg:mt-[105px]   md:text-[16px] text-[14px] md:pt-0  ">
        <div className="container ">
          <h2 className=" text-[35px] mb-9 text-4xl font-bold text-white ">
            Danh Mục Phim{" "}
          </h2>
          <div className="row">{renderPhim(data?.data.content)}</div>
          <div className="text-center mt-4 mb-5">
            <Link
              to="danhmuc"
              type="text"
              className="!text-white rounded-md border-2 border-blue-300 ms-2 hover:!bg-blue-300 py-3 px-6"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
