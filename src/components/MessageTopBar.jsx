import styled from "styled-components";

function MessageTopBar() {
  return (
    <StyledMessageTopBar>
      <BackButton>◀</BackButton>

      <Profile>
        <span>
          <img src="/images/default-avatar.png" alt="Avatar" />
        </span>
        <span>
          <span>Sabbir Islam</span>
          <span>Active now</span>
        </span>
      </Profile>
    </StyledMessageTopBar>
  );
}

export default MessageTopBar;

const StyledMessageTopBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
  height: 5rem;

  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const BackButton = styled.button`
  padding: 0.5rem 0.7rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > :first-child {
  }

  > :last-child {
    display: flex;
    flex-direction: column;
  }
`;
