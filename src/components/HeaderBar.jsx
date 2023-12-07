import styled from "styled-components";

function HeaderBar() {
  return (
    <StyledHeaderBar>
      <Profile>
        <span>
          <img src="/images/default-avatar.png" alt="Avatar" />
        </span>
        <span>
          <span>Alamin Hossain</span>
          <span>@alamin</span>
        </span>
      </Profile>

      <SearchBar>
        <input type="text" placeholder="Search people" />
      </SearchBar>
    </StyledHeaderBar>
  );
}

export default HeaderBar;

const StyledHeaderBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
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

const SearchBar = styled.div`
  input {
    width: 8rem;
  }
`;
