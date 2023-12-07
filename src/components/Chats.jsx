import styled from "styled-components";

function Chats() {
  return (
    <StyledChats>
      <h2>Chats</h2>

      <hr />

      <ChatsContainer>
        <Chat>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Chat>

        <Chat>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Chat>

        <Chat>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Chat>

        <Chat>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Chat>

        <Chat>
          <span>
            <img src="/images/default-avatar.png" alt="User" />
          </span>

          <span>
            <span>Name</span>
            <span>Last message</span>
          </span>
        </Chat>
      </ChatsContainer>
    </StyledChats>
  );
}

export default Chats;

const StyledChats = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Chat = styled.div`
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
