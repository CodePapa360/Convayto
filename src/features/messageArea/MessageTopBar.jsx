import { useUi } from "../../contexts/UiContext";
import { useNavigate } from "react-router-dom";
import FriendProfileBar from "../sideBar/FriendProfileBar";
import useConvInfo from "./useConvInfo";
import Loader from "../../components/Loader";
import Profile from "../../components/Profile";
import IconButton from "../../components/IconButton";

function MessageTopBar() {
  const { convInfo, isPending } = useConvInfo();
  const { openFriendSidebar, isFriendsSidebarOpen, openSidebar } = useUi();

  const friend = convInfo?.friendInfo;
  const navigate = useNavigate();

  function handleGoBack() {
    if (window.matchMedia("(max-width: 640px)").matches) {
      navigate("/", { replace: true });
    } else {
      openSidebar();
    }
  }

  return (
    <>
      <div className="z-10 flex min-h-20 select-none items-center gap-2 rounded-b-xl border-b border-l border-r bg-white p-2 shadow-lg dark:border-slate-800/90 dark:bg-slate-900">
        <IconButton addClass="md:hidden" onClick={handleGoBack}>
          <IconButton.Back />
        </IconButton>

        {isPending ? (
          <Loader size="medium" text="Loading user" />
        ) : (
          <Profile onClick={openFriendSidebar} userData={friend} />
        )}
      </div>

      {/* Hidden right side bar which will reveal if clicked on friend's profile info */}
      {isFriendsSidebarOpen && <FriendProfileBar friend={friend} />}
    </>
  );
}

export default MessageTopBar;
