import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "../../services/quanLyPhim";
import { Button, Card, Skeleton } from "antd";
import { sleep } from "../../utils";
import { Phim } from "../../@types";

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
  // const navigate = useNavigate();

  const renderPhim = (data: Phim[] = []) => {
    return data.map((phim) => {
      return (
        <div key={phim.maPhim} className="col-3 mb-16 card-film ">
          <Card
            className="card-img card"
            hoverable
            style={{ height: 450, width: "100%" }}
            cover={
              <img className="img-phim" alt="example" src={phim.hinhAnh} />
            }
          >
            <div className="card-data ">
              <Card.Meta
                title={phim.tenPhim}
                className="card-data"
                style={{}}
              />
              {/* <p>{phim?.moTa}</p> */}
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
        </div>
      </div>
    </div>
  );
};
