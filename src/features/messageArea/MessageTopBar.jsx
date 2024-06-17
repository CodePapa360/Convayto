import { RiArrowLeftLine } from "react-icons/ri";
import { useUi } from "../../contexts/UiContext";
import { useNavigate } from "react-router-dom";
import FriendProfileBar from "../sideBar/FriendProfileBar";
import useConvInfo from "./useConvInfo";
import Loader from "../../components/Loader";
import Profile from "../../components/Profile";

function MessageTopBar() {
  const { convInfo, isPending, isError } = useConvInfo();
  const { openFriendSidebar, openSidebar } = useUi();

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
      <div className="z-10 flex min-h-20 select-none items-center gap-2 rounded-b-xl border-b border-l border-r border-borderShade bg-mediumSlate p-2 shadow-[0px_5px_6px_0px_rgba(0,0,0,0.3)] dark:border-borderShade-dark dark:bg-mediumSlate-dark">
        <button
          onClick={handleGoBack}
          className="rounded-full p-3 text-xl hover:bg-black/10 active:scale-95 dark:hover:bg-lightSlate/10 md:hidden"
        >
          <RiArrowLeftLine aria-label="go back" />
        </button>

        {isPending ? (
          <Loader size="medium" text="Loading user" />
        ) : (
          <Profile onClick={openFriendSidebar} userData={friend} />
        )}
      </div>

      {/* Hidden right side bar which will reveal if clicked on friend's profile info */}
      <FriendProfileBar friend={friend} />
    </>
  );
}

export default MessageTopBar;
