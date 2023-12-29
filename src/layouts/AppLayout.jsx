// import styled from "styled-components";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function AppLayout() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-gray-900 text-gray-50">
      <LeftSideBar />

      <Outlet />
    </main>
  );
}

export default AppLayout;
