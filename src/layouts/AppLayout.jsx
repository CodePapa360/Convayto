import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function AppLayout() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-slate-900 text-slate-50">
      <LeftSideBar />

      <Outlet />
    </main>
  );
}

export default AppLayout;
