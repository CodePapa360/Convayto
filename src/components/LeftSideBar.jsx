import { useEffect } from "react";
import MyAccount from "./Profile/MyAccount";
import MainSidebarContents from "./MainSidebarContents";
import { useUi } from "../contexts/UiContext";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function LeftSideBar() {
  const { isSidebarOpen, isAccountView, closeSidebar, openSidebar } = useUi();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    // remove all pages except the first one
    queryClient.setQueryData(["friend", userId], (prev) => {
      if (!prev) return;
      if (prev.pages[1]?.length === 0) return;

      return {
        pages: prev.pages.slice(0, 1),
        pageParams: prev.pageParams.slice(0, 1),
      };
    });

    // close sidebar if user is not logged in
    if (userId) closeSidebar();
    else openSidebar();
  }, [userId, queryClient]);

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
        } absolute top-0 z-20 h-dvh  w-full overflow-y-auto bg-mediumSlate transition-all duration-500 ease-[cubic-bezier(.15,.72,.08,.99)] dark:bg-mediumSlate-dark sm:w-[23rem] md:relative md:left-0 md:opacity-100`}
      >
        <aside>{isAccountView ? <MyAccount /> : <MainSidebarContents />}</aside>
      </div>
    </>
  );
}

export default LeftSideBar;
