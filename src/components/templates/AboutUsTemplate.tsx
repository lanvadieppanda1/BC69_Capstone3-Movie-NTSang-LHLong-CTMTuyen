import React from "react";
import img1 from "../../assets/doitac/img1.png";
import img2 from "../../assets/doitac/img2.png";
import img3 from "../../assets/doitac/img3.png";

import img5 from "../../assets/doitac/img5.png";
import img6 from "../../assets/doitac/img6.png";

export const AboutUsTemplate = () => {
  return (
    <div className="container mx-auto py-10 px-6 lg:px-0 bg-black">
      <div className="lg:mt-[105px]   md:text-[16px] text-[14px] md:pt-0">
        <h1 className="text-4xl font-bold text-white ">About Us</h1>
        <p className="text-lg  text-white mt-4 ">
          Welcome to Galaxy Cinema, your ultimate movie destination!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10  text-white">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">
            With nearly 30 years of experience, Galaxy Cinema has become a
            household name with 20 theaters nationwide. We're known for premier
            movies from around the world, including Hollywood, Korea, Japan, and
            more. We pride ourselves on delivering high-quality service with
            exciting promotions year-round!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to become the top movie hub, offering the latest
            releases, easy ticket booking, and engaging film content for movie
            lovers worldwide.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Up-to-date movie news</li>
            <li>Comprehensive movie database</li>
            <li>Easy-to-use online booking system</li>
            <li>Customer reviews and ratings</li>
            <li>Exclusive promotions and membership benefits</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">
            For inquiries, please email us at{" "}
            <a
              href="mailto:info@moviesite.com"
              className="text-blue-600 hover:underline"
            >
              info@moviesite.com
            </a>
            .
          </p>
        </div>
      </div>

      {/* Đối tác  */}
      <div className="mt-5">
        <h2 className="text-white text-[35px] font-500 mb-9 ">
          Đối tác của chúng tôi
        </h2>
        <ul className="flex flex-wrap">
          <li className="lg:w-1/6 md:w-1/3 w-1/2 cursor-pointer">
            <img
              src={img1}
              alt="img"
              className="opacity-60 hover:opacity-90 transition-all"
            />
          </li>
          <li className="lg:w-1/6 md:w-1/3 w-1/2 cursor-pointer">
            <img
              src={img2}
              alt="img"
              className="opacity-60 hover:opacity-90 transition-all"
            />
          </li>
          <li className="lg:w-1/6 md:w-1/3 w-1/2 cursor-pointer">
            <img
              src={img3}
              alt="img"
              className="opacity-60 hover:opacity-90 transition-all"
            />
          </li>
          <li className="lg:w-1/6 md:w-1/3 w-1/2 cursor-pointer">
            <img
              src={img3}
              alt="img"
              className="opacity-60 hover:opacity-90 transition-all"
            />
          </li>
          <li className="lg:w-1/6 md:w-1/3 w-1/2 cursor-pointer">
            <img
              src={img5}
              alt="img"
              className="opacity-60 hover:opacity-90 transition-all"
            />
          </li>
          <li className="lg:w-1/6 md:w-1/3 w-1/2 cursor-pointer">
            <img
              src={img6}
              alt="img"
              className="opacity-60 hover:opacity-90 transition-all"
            />
          </li>
        </ul>
      </div>

      <div className="text-center mt-5">
        <p className="text-gray-500">
          Learn more about us on our official website:{" "}
          <a
            href="https://www.galaxycine.vn/ve-chung-toi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Galaxy Cinema
          </a>
          .
        </p>
      </div>
    </div>
  );
};
