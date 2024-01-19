import { RiArrowLeftLine } from "react-icons/ri";
import { useMessages } from "../features/hooks/useMessages";
import { useUi } from "../contexts/UiContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import FriendProfileBar from "./FriendProfileBar";
import { HiOutlineUserCircle } from "react-icons/hi2";

function MessageTopBar() {
  const { data, isPending } = useMessages();
  const { avatar_url, fullname, username } = data?.friendDetails ?? {};
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
          className="rounded-full p-3 text-xl hover:bg-black/10 active:scale-95 md:hidden dark:hover:bg-lightSlate/10"
        >
          <RiArrowLeftLine />
        </button>

        {isPending ? (
          <Loader size="medium" text="Loading user" customClasses="ml-2" />
        ) : (
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
                  style={{ height: "100%", opacity: "0.5", width: "100%" }}
                  strokeWidth="1"
                />
              )}
            </span>
            <span className="flex flex-col">
              <span>{fullname}</span>
              <span className="text-sm  opacity-70">@{username}</span>
            </span>
          </div>
        )}
      </div>

      <FriendProfileBar data={data} />
    </>
  );
}

export default MessageTopBar;
