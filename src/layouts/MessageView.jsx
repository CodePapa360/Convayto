import styled from "styled-components";
import Messages from "../components/Messages";
import MessageTopBar from "../components/MessageTopBar";
import MessageInputBar from "../components/MessageInputBar";

function MessageView() {
  return (
    <StyledMessageView>
      <MessageTopBar />

      <MessageContainer>
        <MessagesWrapper>
          <Messages />
        </MessagesWrapper>
      </MessageContainer>

      <MessageInputBar />
    </StyledMessageView>
  );
}

export default MessageView;

const StyledMessageView = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 4rem;
  height: 100vh;
  height: 100dvh;
`;

const MessageContainer = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  overflow-y: scroll;

  // puts the messages to the bottom
  display: grid;
  align-items: end;
`;

const MessagesWrapper = styled.div`
  /* box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3); */

  margin-inline: auto;
  width: 100%;
  max-width: 50rem;
`;
