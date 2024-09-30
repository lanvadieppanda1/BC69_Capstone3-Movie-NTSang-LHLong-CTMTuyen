import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";
import { Dispatch, SetStateAction } from "react";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";
import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";
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
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <svg
              width="126"
              height="23"
              viewBox="0 0 126 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.2441 22H13.7178V12.7568H5.23633V22H0.695312V0.583984H5.23633V8.97754H13.7178V0.583984H18.2441V22ZM43.1025 11.2627C43.1025 14.8076 42.2236 17.5322 40.4658 19.4365C38.708 21.3408 36.1885 22.293 32.9072 22.293C29.626 22.293 27.1064 21.3408 25.3486 19.4365C23.5908 17.5322 22.7119 14.7979 22.7119 11.2334C22.7119 7.66895 23.5908 4.94922 25.3486 3.07422C27.1162 1.18945 29.6455 0.24707 32.9365 0.24707C36.2275 0.24707 38.7422 1.19434 40.4805 3.08887C42.2285 4.9834 43.1025 7.70801 43.1025 11.2627ZM27.4727 11.2627C27.4727 13.6553 27.9268 15.457 28.835 16.668C29.7432 17.8789 31.1006 18.4844 32.9072 18.4844C36.5303 18.4844 38.3418 16.0771 38.3418 11.2627C38.3418 6.43848 36.54 4.02637 32.9365 4.02637C31.1299 4.02637 29.7676 4.63672 28.8496 5.85742C27.9316 7.06836 27.4727 8.87012 27.4727 11.2627ZM55.8027 22H51.2617V4.36328H45.4463V0.583984H61.6182V4.36328H55.8027V22Z"
                fill="#F9AB00"
              />
              <path
                d="M69.3818 22H64.9141V0.583984H77.1895V4.30469H69.3818V9.82715H76.6475V13.5332H69.3818V22ZM81.3789 22V0.583984H85.9199V18.25H94.6064V22H81.3789ZM98.3418 22V0.583984H102.883V22H98.3418ZM125.588 22H120.402L115.422 13.8994L110.441 22H105.578L112.683 10.9551L106.032 0.583984H111.042L115.656 8.28906L120.183 0.583984H125.075L118.352 11.2041L125.588 22Z"
                fill="white"
              />
            </svg>
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
