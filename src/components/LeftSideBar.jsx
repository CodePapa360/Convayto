import styled from "styled-components";
import { useState } from "react";
import MyAccount from "./MyAccount";
import MainSidebarContents from "./MainSidebarContents";

function LeftSideBar() {
  const [accountView, setAccountView] = useState(false);

  return (
    <StyledLeftSideBar>
      {accountView && <MyAccount onSetMyAccountView={setAccountView} />}

      {!accountView && (
        <MainSidebarContents onSetMyAccountView={setAccountView} />
      )}
    </StyledLeftSideBar>
  );
}

export default LeftSideBar;

const StyledLeftSideBar = styled.div`
  height: 100vh;
  height: 100dvh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr;
`;
