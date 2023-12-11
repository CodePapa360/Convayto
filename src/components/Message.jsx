import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { formatTime } from "../utils/common";

function Message({ message }) {
  const { user } = useUser();

  return (
    <StyledMessage
      className={message.sender_id === user.id ? "own-message" : ""}
    >
      <p>
        {message.content}
        <span>{formatTime(message.created_at)}</span>
      </p>
    </StyledMessage>
  );
}

export default Message;

const StyledMessage = styled.div`
  /* padding: 0.5rem; */
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem 1rem;

  width: fit-content;
  max-width: 80%;

  > p {
    /* word-break: break-word;
    white-space: pre-wrap; */
    /* background-color: rgba(0, 0, 0, 0.1); */
    direction: ltr;
  }

  span {
    float: right;
    font-size: 0.8rem;
    font-style: italic;
    line-height: 2;
    margin-left: 0.5rem;
    color: rgba(0, 0, 0, 0.7);
    user-select: none;
  }

  &.own-message {
    align-self: flex-end;
    background-color: bisque;
  }
`;
