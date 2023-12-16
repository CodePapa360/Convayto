import styled from "styled-components";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function AppLayout() {
  return (
    <StyledAppLayout>
      <LeftSideBar />

      <RightSide>
        <Outlet />
      </RightSide>
    </StyledAppLayout>
  );
}

export default AppLayout;

const StyledAppLayout = styled.main`
  display: grid;
  grid-template-columns: 22rem 1fr;
  height: 100vh;
  height: 100dvh;
  overflow-y: hidden;
`;

const RightSide = styled.div``;
