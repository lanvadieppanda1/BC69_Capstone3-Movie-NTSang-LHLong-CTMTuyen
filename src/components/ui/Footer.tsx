import React from "react";
import { FloatButton } from "antd";

export const Footer = () => {
  return (
    <div>
      <footer className="footer border-t border-gray-800 bg-black">
        <div className="container">
          <div className="flex md:flex-row flex-col items-center justify-between p-9">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                <img
                  src="https://assets.glxplay.io/web/images/logoglx.svg"
                  className="h-24 w-24"
                  alt=""
                />
              </span>
            </a>
            <span className="footer__copyright text-white flex-1 text-center text-[14px] md:pe-[70px] pe-5">
              Galaxy Play là dịch vụ được cung cấp bởi Công ty Cổ Phần Galaxy
              Play, thành viên của Công ty Cổ Phần Giải Trí và Giáo Dục Galaxy
              (GEE.,JSC)
            </span>
            <FloatButton.BackTop className="border border-orange-400 overflow-hidden bg-black bottom-7" />
          </div>
        </div>
      </footer>
    </div>
  );
};
