import { Avatar, Button, Divider, Popover } from "antd";
import {
  quanLyNguoiDungActions,
  useQuanLyNguoiDungSelector,
} from "../../store/quanLyNguoiDung";
import { useAppDispatch } from "../../store";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

import { useState } from "react";
import classNames from "classnames";

export const Header = () => {
  const dispatch = useAppDispatch();

  const { user } = useQuanLyNguoiDungSelector();
  console.log("user: ", user);

  const navigate = useNavigate();

  const [isshowMenu, setIsShowMenu] = useState(false);

  return (
    <nav className=" fixed w-full z-20 top-0 start-0  navbar p-0">
      <div className="container m-auto flex flex-wrap items-center justify-between mx-auto md:py-[25px] py-4 px-4 relative">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className=" self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <img
              src="https://assets.glxplay.io/web/images/logoglx.svg"
              className="h-24 w-24"
              alt=""
            />
          </span>
        </a>

        {/* Menu  */}
        <div
          className={classNames(
            "menu flex items-center flex-1 md:flex-row flex-col lg:relative absolute w-full top-full left-0 px-3 lg:px-0 lg:py-0  lg:bg-transparent bg-[#1f1e24] overflow-visible",
            {
              isShow: isshowMenu,
            }
          )}
        >
          <div
            className="flex-1 items-center justify-center w-full md:flex md:w-auto md:mb-0 "
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4:p-0 font-medium rounded-lg lg:space-x-8 md:space-x-3 rtl:space-x-reverse md:flex-row lg:text-[16px] text-[14px] nav-links">
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="/"
                  className="block py-2 px-3 text-white hover:text-orange-300 md:p-0 text-center"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="vechungtoi"
                  className="block py-2 px-3 md:p-0 text-white hover:text-orange-300 text-center"
                >
                  Về chúng tôi
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="danhmuc"
                  className="block py-2 px-3 md:p-0 text-white hover:text-orange-300 text-center"
                >
                  Danh mục
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="lienhe"
                  className="block py-2 px-3 md:p-0 text-white hover:text-orange-300 text-center"
                >
                  Liên hệ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Dang nhap/ Dang ky  */}

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center gap-10">
              <p>Hi, {user?.hoTen}</p>
              <Popover
                content={
                  <div className="flex flex-col gap-20 p-[12px]">
                    <Button type="text">Thông tin tài khoản</Button>
                    <div>
                      <Divider />
                      <Button
                        className="w-full"
                        danger
                        onClick={() =>
                          dispatch(quanLyNguoiDungActions.logOut())
                        }
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                }
              >
                <Avatar
                  size="large"
                  className="bg-[#87d068]"
                  icon={<i className="fa-regular fa-user"></i>}
                />
              </Popover>
            </div>
          ) : (
            <div>
              <Button
                className=" btn-primary m-4"
                type="primary"
                onClick={() => navigate(PATH.login)}
              >
                Đăng Nhập
              </Button>
              <Button onClick={() => navigate(PATH.register)}>Đăng Ký</Button>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-white rounded-lg lg:hidden border-white border"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => {}}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                color="#F9AB00"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
