// import styled from "styled-components";
import { useEffect, useState } from "react";
import MyAccount from "./MyAccount";
import MainSidebarContents from "./MainSidebarContents";
import { useUi } from "../contexts/UiContext";
import { useParams } from "react-router-dom";

function LeftSideBar() {
  const { state, closeSidebar, openSidebar } = useUi();
  const { isSidebarOpen } = state;
  const { userId } = useParams();

  const [accountView, setAccountView] = useState(false);

  useEffect(() => {
    if (userId) closeSidebar();
    else openSidebar();
  }, [userId]);

  function handleToggleSidebar() {
    if (!userId) return;
    closeSidebar();
  }

  return (
    <>
      <div
        onClick={handleToggleSidebar}
        className={`${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        } absolute left-0 top-0 z-0 h-screen w-screen bg-black/50 md:hidden`}
      ></div>

      <aside
        className={`${
          isSidebarOpen ? "left-0" : "-left-full"
        } absolute top-0 z-20 h-screen w-full bg-gray-800 transition-all duration-300 ease-in-out sm:w-[23rem] md:relative md:left-0`}
      >
        {accountView && <MyAccount onSetMyAccountView={setAccountView} />}

        {!accountView && (
          <MainSidebarContents onSetMyAccountView={setAccountView} />
        )}
      </aside>
    </>
  );
}

export default LeftSideBar;

// const StyledLeftSideBar = styled.div`
//   height: 100vh;
//   height: 100dvh;

//   display: grid;
//   grid-template-columns: 1fr;
//   grid-template-rows: 5rem 1fr;
// `;
