// import styled from "styled-components";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function AppLayout() {
  return (
    <main className="grid grid-cols-[23rem_1fr] bg-gray-900 text-gray-50">
      <LeftSideBar />

      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;

// const StyledAppLayout = styled.main`
//   display: grid;
//   grid-template-columns: 22rem 1fr;
//   height: 100vh;
//   height: 100dvh;
//   overflow-y: hidden;
// `;

// const RightSide = styled.div``;
