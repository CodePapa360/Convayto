import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function AppLayout() {
  return (
    <main className="bg-deepSlate grid min-h-dvh min-h-screen grid-cols-[auto_1fr]">
      <LeftSideBar />

      <Outlet />
    </main>
  );
}

export default AppLayout;
