import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../ui";
import cn from "classnames";

export const AdminLayOut = () => {
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

  return (
    <div className="bg-[#4f4582]">
      <main
        className={cn(
          "flex flex-wrap  min-h-screen md:text-[16px] text-[14px] md:pt-0 adminLayout relative",
          { active: activeSidebar }
        )}>
        <div className="blockSideBar top-0 left-0 h-full bg-[#1a191f] z-10 fixed">
        <SideBar
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
          />
        </div>
        <div className="blockContent top-0 left-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
