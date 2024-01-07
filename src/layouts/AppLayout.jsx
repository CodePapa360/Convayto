import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function AppLayout() {
  return (
    <main className="bg-deepSlate dark:bg-deepSlate-dark grid min-h-dvh min-h-screen grid-cols-[auto_1fr] text-black dark:text-white">
      <LeftSideBar />

      <Outlet />
    </main>
  );
}

export default AppLayout;
