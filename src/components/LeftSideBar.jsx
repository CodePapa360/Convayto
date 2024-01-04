import { useEffect, useState } from "react";
import MyAccount from "./Profile/MyAccount";
import MainSidebarContents from "./MainSidebarContents";
import { useUi } from "../contexts/UiContext";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

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
        } absolute left-0 top-0 z-20 hidden h-dvh w-dvw bg-black/50 transition-all duration-200 ease-in-out sm:block md:hidden`}
      ></div>

      <div
        className={`${
          isSidebarOpen ? "left-0 opacity-100" : "-left-full opacity-0"
        } absolute top-0 z-20  h-dvh w-full overflow-y-auto bg-slate-800 transition-all duration-500 ease-[cubic-bezier(.15,.72,.08,.99)] sm:w-[23rem] md:relative md:left-0 md:opacity-100`}
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
