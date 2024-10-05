// rafc
import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "../../services/quanLyPhim";
import { Button, Card, Skeleton } from "antd";
import { sleep } from "../../utils";
import { Phim } from "../../@types";
import { generatePath, useNavigate, Link } from "react-router-dom";
import { PATH } from "../../constants";
import Banner from "../ui/Banner/Banner";
import { Tabs } from "antd";

export const HomeTemplate = () => {
  const navigate = useNavigate();

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

  const renderPhim = (data: Phim[] = []) => {
    return data.map((phim) => {
      return (
        <div key={phim.maPhim} className="col-3 mb-16 card-film ">
          <Card
            className="card-img card"
            hoverable
            style={{ height: 400, width: "100%", textAlign: "left" }}
            cover={
              <img className="img-phim" alt="example" src={phim.hinhAnh} />
            }
          >
            <div className="card-data ">
              <Card.Meta
                title={phim.tenPhim}
                className="card-dat "
                style={{}}
              />
              {/* <p>{phim?.moTa}</p> */}
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

  // tab
  const { TabPane } = Tabs;

  return (
    <div className="main wrapper bg-black">
      <div className="col-main">
        <Banner />
      </div>

      <div className="container m-auto py-[50px] px-4">
        <Tabs defaultActiveKey="1" className="fw-10">
          <TabPane tab="Phim Đang Chiếu" key="1">
            <div className="container ">
              <div className="row">
                {renderPhim(
                  data?.data.content?.filter((item) => item.dangChieu)
                )}
              </div>
              <div className="text-center mt-4">
                <Link
                  to="danhmuc"
                  type="text"
                  className="!text-white rounded-md border-2 border-blue-300 ms-2 hover:!bg-blue-300 py-3 px-6"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Phim Sắp Chiếu" key="2" className="  mb-30 text-center">
            <div className="container">
              <div className="row">
                {renderPhim(
                  data?.data.content.filter((item) => !item.dangChieu)
                )}
              </div>
              <div className="text-center mt-4">
                <Link
                  to="danhmuc"
                  type="text"
                  className="!text-white rounded-md border-2 border-blue-300 ms-2 hover:!bg-blue-300 py-3 px-6"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
