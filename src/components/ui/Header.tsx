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
    <nav className="fixed w-full z-20 top-0 start-0 navbar p-0">
      <div className="container m-auto flex flex-wrap items-center justify-between mx-auto md:py-[25px] py-4 px-4 relative">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <img
              src="https://assets.glxplay.io/web/images/logoglx.svg"
              className="h-24 w-24"
              alt=""
            />
          </span>
        </a>

        {/* Menu */}
        <div
          className={classNames(
            "menu flex items-center flex-1 md:flex-row flex-col lg:relative absolute w-full top-full left-0 px-3 lg:px-0 lg:py-0 lg:bg-transparent bg-[#1f1e24] overflow-visible",
            {
              isShow: isshowMenu,
            }
          )}
        >
          <div
            className="flex-1 items-center justify-center w-full md:flex md:w-auto md:mb-0"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4:p-0 font-medium rounded-lg lg:space-x-8 md:space-x-3 rtl:space-x-reverse md:flex-row lg:text-[16px] text-[14px] nav-links">
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="/"
                  className="block py-2 px-3 text-white hover:text-blue-300 md:p-0 text-center"
                >
                  Homepage
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="vechungtoi"
                  className="block py-2 px-3 md:p-0 text-white hover:text-blue-300 text-center"
                >
                  about us
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="danhmuc"
                  className="block py-2 px-3 md:p-0 text-white hover:text-blue-300 text-center"
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to="lienhe"
                  className="block py-2 px-3 md:p-0 text-white hover:text-blue-300 text-center"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center gap-10">
              <p>Hi, {user?.hoTen}</p>
              <Popover
                content={
                  <div className="">
                    <Button
                      type="text"
                      onClick={() => {
                        navigate(PATH.profile);
                      }}
                    >
                      information of account
                    </Button>
                    <Button
                      type="text"
                      onClick={() => {
                        navigate(PATH.FilmManament);
                      }}
                    >
                      Move to adminpage
                    </Button>

                    <div>
                      <Divider />
                      <Button
                        className="w-full"
                        danger
                        onClick={() =>
                          dispatch(quanLyNguoiDungActions.logOut())
                        }
                      >
                        Logout
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
                className="btn-primary m-4"
                type="primary"
                onClick={() => navigate(PATH.login)}
              >
                Login
              </Button>
              <Button onClick={() => navigate(PATH.register)}>Đăng Ký</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
