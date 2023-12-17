import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SearchedUser({ user, onUserClick }) {
  const { fullname, id, username } = user;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${id}`);

    onUserClick(false);
  }

  return (
    <StyledSearchedUser onClick={handleClick}>
      <span>
        <img src="/images/default-avatar.png" alt="User" />
      </span>

      <span>
        <span>{fullname}</span>
        <span>@{username}</span>
      </span>
    </StyledSearchedUser>
  );
}

export default SearchedUser;

const StyledSearchedUser = styled.div`
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
