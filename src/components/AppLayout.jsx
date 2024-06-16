import { Outlet } from "react-router-dom";
import LeftSideBar from "../features/sideBar/LeftSideBar";
import MainContainer from "./MainContainer";

function AppLayout() {
  return (
    <MainContainer>
      <div className="grid w-full grid-cols-[auto_1fr]">
        <LeftSideBar />

        <Outlet />
      </div>
    </MainContainer>
  );
}

export default AppLayout;
