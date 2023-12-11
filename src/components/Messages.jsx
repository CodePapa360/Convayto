import styled from "styled-components";
import { useMessages } from "../features/converse/useMessages";
import Message from "./Message";

function Messages() {
  const { data, isPending } = useMessages();
  const messages = data?.messages;

  return (
    <StyledMessages>
      {isPending && <p>Loading messages...</p>}

      {messages?.length === 0 && <p>No messages</p>}
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
