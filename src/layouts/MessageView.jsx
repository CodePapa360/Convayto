import styled from "styled-components";

function MessageView() {
  return (
    <StyledMessageView>
      <TopBar>
        <back-button></back-button>
        <user-inof></user-inof>
      </TopBar>

      <MessageContainer>
        <MessagesWrapper>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
          <p>test message</p>
        </MessagesWrapper>
      </MessageContainer>

      <InputBar></InputBar>
    </StyledMessageView>
  );
}

export default MessageView;

const StyledMessageView = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* height: 100%; */

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 4rem;
  grid-template-areas:
    "top-bar"
    "middle"
    "bottom-bar";

  height: 100vh;
`;

const TopBar = styled.div`
  background-color: azure;
  height: 5rem;

  grid-area: top-bar;
`;

const MessageContainer = styled.div`
  border: 2px solid purple;
  padding: 0 0.5rem;
  grid-area: middle;
  overflow-y: scroll;

  /* display: flex;
  flex-direction: column;
  justify-content: flex-end; */
`;

const MessagesWrapper = styled.div`
  border: 2px solid green;
  max-width: 90%;
  margin-inline: auto;
  background-color: bisque;
  width: 100%;
`;

const InputBar = styled.div`
  height: 4rem;
  background-color: #86fa99;

  grid-area: bottom-bar;
  margin-top: auto;
`;
