import styled from "styled-components";

function HeaderBar() {
  return (
    <StyledHeaderBar>
      <profile></profile>
      <search-bar></search-bar>
    </StyledHeaderBar>
  );
}

export default HeaderBar;

const StyledHeaderBar = styled.div`
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
`;
