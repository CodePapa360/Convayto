import styled from "styled-components";
import { useMessages } from "../features/converse/useMessages";
import Message from "./Message";
import { useRef } from "react";
import { sortMessageByTime } from "../utils/common";

function Messages() {
  const { data, isPending } = useMessages();
  const messages = data?.messages.sort(sortMessageByTime);

  const bottomRef = useRef();

  return (
    <StyledMessages>
      {isPending && <p>Loading messages...</p>}

      {messages?.length === 0 && <p>No messages</p>}
      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}

      {bottomRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })}
      <span ref={bottomRef}></span>
    </StyledMessages>
  );
}

export default Messages;

const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem;
`;
