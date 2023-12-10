import styled from "styled-components";
import { useMessages } from "../features/converse/useMessages";
import Message from "./Message";

function Messages() {
  const { data: messages, isPending } = useMessages();

  return (
    <StyledMessages>
      {isPending && <p>Loading messages...</p>}

      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
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
