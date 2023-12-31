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
        } absolute left-0 top-0 z-0 h-dvh h-svh w-dvw bg-black/50 md:hidden`}
      ></div>

      <div
        className={`${
          isSidebarOpen ? "left-0" : "-left-full"
        } absolute top-0 z-20 h-dvh h-svh w-full overflow-y-scroll bg-slate-800 transition-all duration-300 ease-[cubic-bezier(0.47,0,0.745,0.715)] sm:w-[23rem] md:relative md:left-0`}
      >
        <aside>
          {accountView && <MyAccount onSetMyAccountView={setAccountView} />}

          {!accountView && (
            <MainSidebarContents onSetMyAccountView={setAccountView} />
          )}
        </aside>
      </div>
    </>
  );
}

export default LeftSideBar;
