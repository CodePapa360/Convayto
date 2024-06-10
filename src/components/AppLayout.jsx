import { Outlet } from "react-router-dom";
import LeftSideBar from "../features/sideBar/LeftSideBar";

function AppLayout() {
  return (
    <main className="min-h-screen-safe grid grid-cols-[auto_1fr] overflow-hidden bg-deepSlate text-black dark:bg-deepSlate-dark dark:text-white">
      <LeftSideBar />

      <Outlet />
    </main>
  );
}

export default AppLayout;
