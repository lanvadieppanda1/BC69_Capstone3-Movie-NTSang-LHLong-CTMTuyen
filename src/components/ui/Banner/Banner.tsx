import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { getBanners } from "./bannerAPI";
import { CustomPrevArrow, CustomNextArrow } from "./CustomPrevArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BannerData {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
}

const Banner: React.FC = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners(); // Gọi API lấy danh sách banner
        setBanners(data); // Lưu trữ dữ liệu banner vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu banner", error);
      }
    };

    fetchBanners();
  }, []);

  // Cấu hình cho Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.maBanner} className="w-full h-full">
            <img
              src={banner.hinhAnh}
              alt={`Banner ${banner.maBanner}`}
              style={{ width: "100%", height: "100%" }}
              className=" bg-header"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
