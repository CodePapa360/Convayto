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
  background-color: antiquewhite;

  //temp
  height: 5rem;
`;
