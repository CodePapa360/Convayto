import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUi } from "../../contexts/UiContext";
import ToggleableContent from "../../components/ToggleableContent";
import MyAccountView from "../userProfile/MyAccountView";
import DefaultView from "./DefaultView";

function LeftSideBar() {
  const { isSidebarOpen, isAccountViewOpen, closeSidebar, openSidebar } =
    useUi();
  const { userId } = useParams();

  useEffect(() => {
    userId ? closeSidebar() : openSidebar();
  }, [userId]);

  function handleToggleSidebar() {
    userId && closeSidebar();
  }

  return (
    <ToggleableContent isOpen={isSidebarOpen} toggle={handleToggleSidebar}>
      <aside
        className={`${
          isSidebarOpen
            ? "visible left-0 opacity-100"
            : "invisible -left-full opacity-0"
        } absolute top-0 z-30 h-screen-safe w-full overflow-hidden bg-bgPrimary shadow-lg transition-all duration-500 ease-[cubic-bezier(.15,.72,.08,.99)] dark:bg-bgPrimary-dark sm:w-[23rem] md:visible md:relative md:left-0 md:opacity-100`}
      >
        {isAccountViewOpen ? <MyAccountView /> : <DefaultView />}
      </aside>
    </ToggleableContent>
  );
}

export default LeftSideBar;
