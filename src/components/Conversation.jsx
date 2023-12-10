import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Conversation({ conversation }) {
  const { user, lastMessage } = conversation;

  const { fullname, id } = user;
  const messageContent = lastMessage?.content
    ? lastMessage.content.length > 30
      ? `${lastMessage.content.slice(0, 30)}...`
      : lastMessage.content
    : "";

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${id}`);
  }

  return (
    <StyledConversation onClick={handleClick}>
      <span>
        <img src="/images/default-avatar.png" alt="User" />
      </span>

      <span>
        <span>{fullname}</span>
        <span>{messageContent}</span>
      </span>
    </StyledConversation>
  );
}

export default Conversation;

const StyledConversation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;

  border-bottom: 1px solid gray;

  > :first-child {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  > :last-child {
    display: flex;
    flex-direction: column;
  }
`;
