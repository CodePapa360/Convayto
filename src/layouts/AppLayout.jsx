import styled from "styled-components";
import HeaderBar from "./HeaderBar";
import MessageView from "./MessageView";

function AppLayout() {
  return (
    <StyledAppLayout>
      <LeftSide>
        <HeaderBar></HeaderBar>
        <chats-section></chats-section>
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
  /* overflow: hidden; */
`;

const LeftSide = styled.div`
  background-color: yellow;
`;

const RightSide = styled.div`
  background-color: aqua;
  display: flex;
  flex-direction: column;
`;
