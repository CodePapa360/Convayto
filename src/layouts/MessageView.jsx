import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function MessageView() {
  const [messages, setMessages] = useState([]);
  const bottomMsgRef = useRef();

  function scrollToBottom() {
    bottomMsgRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessages((msg) => [...msg, "Test message: "]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <StyledMessageView>
      <TopBar>
        <back-button></back-button>
        <user-inof></user-inof>
      </TopBar>

      <MessageContainer>
        <MessagesWrapper>
          {messages.map((msg, i) => (
            <p key={i}>
              {msg}
              {i + 1}
            </p>
          ))}

          <span ref={bottomMsgRef} className="bottomMsg"></span>
        </MessagesWrapper>
      </MessageContainer>

      <InputBar></InputBar>
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

const TopBar = styled.div`
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  height: 5rem;
`;

const MessageContainer = styled.div`
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  overflow-y: scroll;

  // puts the messages to the bottom
  display: grid;
  align-items: end;
`;

const MessagesWrapper = styled.div`
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  max-width: 90%;
  margin-inline: auto;
  width: 100%;
`;

const InputBar = styled.div`
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  height: 4rem;
  margin-top: auto;
`;
