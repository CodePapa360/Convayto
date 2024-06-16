import { Outlet } from "react-router-dom";
import LeftSideBar from "../features/sideBar/LeftSideBar";
import FullscreenMain from "./FullscreenMain";

function AppLayout() {
  return (
    <FullscreenMain>
      <div className="grid w-full grid-cols-[auto_1fr]">
        <LeftSideBar />

        <Outlet />
      </div>
    </FullscreenMain>
  );
}

export default AppLayout;
