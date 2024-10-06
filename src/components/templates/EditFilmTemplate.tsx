import { Button, DatePicker, Input, Switch, Upload, UploadFile } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EditPhimSchema, FilmManageSchema, FilmManageSchemaType, editPhimSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { token } from "../../constants";
import { useEffect, useState } from "react";
import { sleep } from "../../utils";

export const EditFilmTemplate = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const maPhim = searchParams.get("maPhim");

  const headers = {
    Authorization: `Bearer ${token}`,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<editPhimSchemaType>({
    mode: "onChange",
    resolver: zodResolver(EditPhimSchema),
    defaultValues: {
      hinhAnh: undefined,
      ngayKhoiChieu: null,
    },
  });

  const files = watch("hinhAnh");

  function convertUploadFileToFileList(uploadFiles: UploadFile[]): FileList {
    const dataTransfer = new DataTransfer();

    uploadFiles.forEach((uploadFile) => {
      if (uploadFile.originFileObj) {
        dataTransfer.items.add(uploadFile.originFileObj as File);
      }
    });

    return dataTransfer.files;
  }

  useEffect(() => {
    const currentPhim = async () => {
      try {
        const api = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
        const response = await axios.get(api, { headers: headers });
        const defaultData = response.data.content;
        const fileList: UploadFile[] = [
          {
            uid: "-1", // cần uid để Upload nhận diện
            name: "image.png", // tên file
            status: "done", // trạng thái
            url: defaultData.hinhAnh, // đường link hình ảnh
          },
        ];
        setValue("maPhim", defaultData.maPhim);
        setValue("tenPhim", defaultData.tenPhim);
        setValue("biDanh", defaultData.biDanh);
        setValue("trailer", defaultData.trailer);
        setValue(
          "hinhAnh",
          convertUploadFileToFileList(fileList as UploadFile[])
        );
        setValue("moTa", defaultData.moTa);
        setValue("maNhom", defaultData.maNhom);
        setValue(
          "ngayKhoiChieu",
          moment(defaultData.ngayKhoiChieu).format("DD-MM-YYYY")
        );
        setValue("danhGia", defaultData.danhGia);
        setValue("hot", defaultData.hot);
        setValue("dangChieu", defaultData.dangChieu);
        setValue("sapChieu", defaultData.sapChieu);
      } catch (error) {
        console.error(error);
      }
    };
    currentPhim();
  }, [setValue]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleOnChangeUpload = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const onSubmitHandle: SubmitHandler<editPhimSchemaType> = async (data) => {
    console.log(
      "constonSubmitHandle:SubmitHandler<editPhimSchemaType>=data:",
      data
    );
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) {
        formData.append(key, "false");
        continue;
      }
      if (key === "hinhAnh" && Array.isArray(value)) {
        const uploadedFiles = value.map((file) => file.originFileObj);
        formData.append(key, uploadedFiles[0]);
        continue;
      }
      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        // Trường hợp khác, giá trị là string hoặc các kiểu hợp lệ khác
        formData.append(key, value as string);
      }
    }
    try {
      const response = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(-1);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="sm:p-9 p-6 min-h-screen flex flex-col">
      <h2 className="text-white uppercase font-500 xl:text-[30px] md:text-[25px] text-[20px] mb-5">
        Sửa thông tin phim
      </h2>
      <form
        id="addFilmForm"
        className="bg-white md:px-5 md:py-8 p-3"
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <div className="flex flex-wrap">
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Mã phim</p>
            <Controller
              name="maPhim"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Mã phim" disabled />
              )}
            />
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Tên phim</p>
            <Controller
              name="tenPhim"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Tên phim" />
              )}
            />
            {errors?.tenPhim?.message && (
              <p className="text-red-500">{errors?.tenPhim?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Bí danh</p>
            <Controller
              name="biDanh"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Bí danh" />}
            />
            {errors?.biDanh?.message && (
              <p className="text-red-500">{errors?.biDanh?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Trailer</p>
            <Controller
              name="trailer"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Trailer" />}
            />
            {errors?.trailer?.message && (
              <p className="text-red-500">{errors?.trailer?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Hình ảnh</p>
            <Controller
              name="hinhAnh"
              control={control}
              defaultValue={convertUploadFileToFileList(
                fileList as UploadFile[]
              )}
              render={({ field: { onChange, value } }) => (
                <Upload
                  maxCount={1}
                  listType="picture"
                  fileList={Array.isArray(value) ? value : fileList}
                  onChange={(info) => {
                    handleOnChangeUpload(info); // Cập nhật fileList trong state
                    onChange(info.fileList); // Cập nhật giá trị trong React Hook Form
                  }}
                  beforeUpload={() => false} // Ngăn chặn việc tải lên ngay lập tức
                >
                  <Button icon={<UploadOutlined />}>Tải tệp lên</Button>
                </Upload>
              )}
            />
            {errors?.hinhAnh?.message && (
              <p className="text-red-500">{errors?.hinhAnh?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Mô tả</p>
            <Controller
              name="moTa"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Mô tả" />}
            />
            {errors?.moTa?.message && (
              <p className="text-red-500">{errors?.moTa?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Mã nhóm</p>
            <Controller
              name="maNhom"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Mã nhóm" />}
            />
            {errors?.maNhom?.message && (
              <p className="text-red-500">{errors?.maNhom?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Ngày khởi chiếu</p>
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="DD/MM/YYYY"
                  value={field.value ? moment(field.value, "DD/MM/YYYY") : null}
                  onChange={(date) =>
                    field.onChange(date ? date.format("DD/MM/YYYY") : null)
                  }
                />
              )}
            />
            {errors?.ngayKhoiChieu?.message && (
              <p className="text-red-500">{errors?.ngayKhoiChieu?.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full mb-2 p-1">
            <p>Đánh giá</p>
            <Controller
              name="danhGia"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  max={5}
                  placeholder="Số sao"
                />
              )}
            />
            {errors?.danhGia?.message && (
              <p className="text-red-500">{errors?.danhGia?.message}</p>
            )}
          </div>
          <div className="flex w-full flex-wrap">
            <div className="w-1/2 md:w-1/6 mb-2 p-1">
              <p>Hot</p>
              <Controller
                name="hot"
                control={control}
                render={({ field }) => (
                  <Switch {...field} defaultValue={false} />
                )}
              />
              {errors?.hot?.message && (
                <p className="text-red-500">{errors?.hot?.message}</p>
              )}
            </div>
            <div className="w-1/2 md:w-1/6 mb-2 p-1">
              <p>Đang chiếu</p>
              <Controller
                name="dangChieu"
                control={control}
                render={({ field }) => (
                  <Switch {...field} defaultValue={false} />
                )}
              />
              {errors?.dangChieu?.message && (
                <p className="text-red-500">{errors?.dangChieu?.message}</p>
              )}
            </div>
            <div className="w-1/2 md:w-1/6 mb-2 p-1">
              <p>Sắp chiếu</p>
              <Controller
                name="sapChieu"
                control={control}
                render={({ field }) => (
                  <Switch {...field} defaultValue={false} />
                )}
              />
              {errors?.sapChieu?.message && (
                <p className="text-red-500">{errors?.sapChieu?.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="my-5">
          <Button type="dashed" danger size="large">
            Huỷ
          </Button>
          <Button
            type="primary"
            size="large"
            className="ms-3"
            htmlType="submit"
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
};
