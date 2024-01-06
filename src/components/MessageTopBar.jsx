import { RiArrowLeftLine } from "react-icons/ri";
import { useMessages } from "../features/hooks/useMessages";
import { useUi } from "../contexts/UiContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import FriendProfileBar from "./FriendProfileBar";

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
      <div className="flex min-h-20 select-none items-center gap-2 rounded-b-xl border-b border-l border-r border-slate-700 bg-slate-800 p-2">
        <button
          onClick={handleGoBack}
          className="rounded-full p-3 text-xl hover:bg-slate-700 active:scale-95 md:hidden "
        >
          <RiArrowLeftLine />
        </button>

        {isPending ? (
          <Loader size="medium" text="Loading user" customClasses="ml-2" />
        ) : (
          <div
            onClick={() => openFriendSidebar()}
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-700"
          >
            <span className="w-10">
              <img
                draggable="false"
                src={avatar_url ? avatar_url : "/images/default-avatar.svg"}
                alt={fullname}
              />
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
