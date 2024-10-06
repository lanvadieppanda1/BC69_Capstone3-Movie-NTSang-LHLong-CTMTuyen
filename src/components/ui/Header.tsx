import { Avatar, Button, Divider, Popover } from "antd";
import {
  quanLyNguoiDungActions,
  useQuanLyNguoiDungSelector,
} from "../../store/quanLyNguoiDung";
import { useAppDispatch } from "../../store";
import { NavLink, useNavigate } from "react-router-dom";
import { MANHOM, PATH } from "../../constants";
import { ChangeEvent, useRef, useState } from "react";
import classNames from "classnames";
import { quanLyPhimServices } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { Phim } from "../../@types";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useQuanLyNguoiDungSelector();
  console.log("user: ", user);

  const navigate = useNavigate();
  const [isshowMenu, setIsShowMenu] = useState(false);

  const { data } = useQuery({
    queryKey: ["DanhSachPhim"],
    queryFn: async () => {
      return quanLyPhimServices.getDanhSachPhim(MANHOM.manhom);
    },
    enabled: true,
  });

  const [searchResult, setSearchResult] = useState<Phim[] | undefined>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length === 0) {
      setSearchResult([]);
      return;
    }
    const newData = data?.data.content.filter((item) =>
      item.tenPhim.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(newData);
  };

  const handleResetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearchResult([]);
  };

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

        <div className="flex space-x-3 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center gap-10">
                <p className="text-white">{user.hoTen}</p>
              <Popover
                content={
                  <div className="flex flex-col p-[12px] gap-10">
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
