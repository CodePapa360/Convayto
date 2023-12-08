import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Conversations() {
  const navigate = useNavigate();

  function handlClick() {
    navigate("/userId?1234");
  }

  return (
    <StyledConversations>
      <h2>Conversations</h2>

      <hr />

      <ConversationsContainer>
        <Conversation onClick={handlClick}>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Conversation>

        <Conversation>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Conversation>

        <Conversation>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Conversation>

        <Conversation>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Conversation>

        <Conversation>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Conversation>
      </ConversationsContainer>
    </StyledConversations>
  );
}

export default Conversations;

const StyledConversations = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
`;

const ConversationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Conversation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;

  border-bottom: 1px solid gray;

  > :last-child {
    display: flex;
    flex-direction: column;
  }
`;
