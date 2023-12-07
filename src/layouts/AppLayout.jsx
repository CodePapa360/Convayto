import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import MessageView from "./MessageView";
import Chats from "../components/Chats";

function AppLayout() {
  return (
    <StyledAppLayout>
      <LeftSide>
        <HeaderBar></HeaderBar>
        <Chats></Chats>
      </LeftSide>

      <RightSide>
        {/* <outlet></outlet> */}
        <MessageView />
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
`;

const LeftSide = styled.div`
  height: 100vh;
  height: 100dvh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr;
`;

const RightSide = styled.div``;
