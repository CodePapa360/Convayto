import { RiArrowLeftLine } from "react-icons/ri";
import { useUi } from "../../contexts/UiContext";
import { useNavigate } from "react-router-dom";
import FriendProfileBar from "../sideBar/FriendProfileBar";
import { HiOutlineUserCircle } from "react-icons/hi2";
import useConvInfo from "./useConvInfo";

function MessageTopBar() {
  const { convInfo, isPending, isError } = useConvInfo();

  const friend = convInfo?.friendInfo;

  const avatar_url = friend?.avatar_url;
  const fullname = friend?.fullname;
  const username = friend?.username;
  const { openSidebar } = useUi();
  const navigate = useNavigate();

  const { openFriendSidebar } = useUi();

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
          <RiArrowLeftLine />
        </button>

        <div
          onClick={() => openFriendSidebar()}
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-black/10 dark:hover:bg-lightSlate/10"
        >
          <span className="h-12 w-12 overflow-hidden rounded-full text-black  dark:text-white">
            {avatar_url ? (
              <img
                draggable="false"
                src={avatar_url}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <HiOutlineUserCircle
                size={55}
                viewBox="2 2 24 24"
                opacity={0.5}
                strokeWidth="1"
              />
            )}
          </span>
          <span className="flex flex-col">
            <span>{fullname}</span>
            <span className="text-sm  opacity-70">@{username}</span>
          </span>
        </div>
      </div>

      <FriendProfileBar friend={friend} />
    </>
  );
}

export default MessageTopBar;
