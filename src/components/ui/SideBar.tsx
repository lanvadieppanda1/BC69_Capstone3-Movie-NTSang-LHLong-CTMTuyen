import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";
import { Dispatch, SetStateAction } from "react";
import { useQuanLyNguoiDungSelector,quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";
import { useAppDispatch } from "../../store";

type Props = {
  activeSidebar: boolean;
  setActiveSidebar: Dispatch<SetStateAction<boolean>>;
};

export const SideBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const { activeSidebar, setActiveSidebar } = props;

  const navigate = useNavigate();

  const { user } = useQuanLyNguoiDungSelector();

  return (
    <div className="sidebar py-9 px-5 xl:ps-9 min-h-full flex flex-col border-r border-gray-500">
      <div
        className={cn(
          "flex xl:justify-between justify-center items-center mb-12",
          { "justify-between": activeSidebar }
        )}>
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse logoSideBar">
          <span className=" self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <img
              src="https://assets.glxplay.io/web/images/logoglx.svg"
              className="h-24 w-24"
              alt=""
            />
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-orange-400 rounded-md xl:hidden hover:bg-gray-100 z-10"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setActiveSidebar(!activeSidebar)}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        className={cn("flex items-center gap-10 mb-6 xl:justify-start", {
          "justify-center": !activeSidebar,
        })}>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
          className={cn("xl:inline-block", {
            hidden: !activeSidebar,
          })}
        />
        <p
          className={cn("text-white me-5 xl:inline-block", {
            hidden: !activeSidebar,
          })}>
          {user?.hoTen}
        </p>
        <button
          className={cn(
            "inline-flex items-center justify-center w-[30px] h-[30px] rounded border border-orange-400 xl:inline-block"
          )}
          type="button"
          onClick={() => {
            dispatch(quanLyNguoiDungActions.logOut());
            navigate("/");
          }}>
          <i className="fa-solid fa-arrow-right-from-bracket text-white text-[12px]"></i>
        </button>
      </div>
      <div>
        <Divider className="bg-gray-500 mb-9" />
      </div>
      <div className=" text-white">
        <ul className="xl:text-[16px] text-[12px]">
          <li className={cn("mb-5 uppercase text-white hover:text-orange-400")}>
            <NavLink to="admin" className="py-2 px-1">
              <i
                className={cn(
                  "fa-solid fa-file me-2 w-[20px] text-center"
                )}></i>{" "}
              <span
                className={cn("xl:inline-block ms-3", {
                  hidden: !activeSidebar,
                })}>
                Danh sách phim
              </span>
            </NavLink>
          </li>
          <li className={cn("mb-5 uppercase text-white hover:text-orange-400")}>
            <NavLink to="danhsachnguoidung" className="py-2 px-1">
              <i
                className={cn(
                  "fa-solid fa-user me-2 w-[20px] text-center"
                )}></i>{" "}
              <span
                className={cn("xl:inline-block ms-3", {
                  hidden: !activeSidebar,
                })}>
                Danh sách người dùng
              </span>
            </NavLink>
          </li>
          <li className={cn("mb-5 uppercase text-white hover:text-orange-400")}>
            <NavLink to="/" className="py-2 px-1">
              <i
                className={cn(
                  "fa-solid fa-backward-step text-[15px] me-2 w-[20px] text-center"
                )}></i>{" "}
              <span
                className={cn("xl:inline-block ms-3", {
                  hidden: !activeSidebar,
                })}>
                Về trang chủ
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <span
        className={cn("text-white md:text-[14px] text-[12px] mt-auto", {
          hidden: !activeSidebar,
        })}>
        © HOTFLIX, 2019—2024 - Create by{" "}
        <a
          href="https://themeforest.net/user/dmitryvolkov/portfolio"
          target="_blank">
          Dmitry Volkov
        </a>
      </span>
    </div>
  );
};
