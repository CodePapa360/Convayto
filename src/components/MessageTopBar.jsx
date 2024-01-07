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
      <div className="border-borderShade dark:border-borderShade-dark dark:bg-mediumSlate-dark bg-mediumSlate flex min-h-20 select-none items-center gap-2 rounded-b-xl border-b border-l border-r p-2">
        <button
          onClick={handleGoBack}
          className="hover:bg-lightSlate/50 rounded-full p-3 text-xl active:scale-95 md:hidden "
        >
          <RiArrowLeftLine />
        </button>

        {isPending ? (
          <Loader size="medium" text="Loading user" customClasses="ml-2" />
        ) : (
          <div
            onClick={() => openFriendSidebar()}
            className="hover:bg-lightSlate/50 flex cursor-pointer items-center gap-2 rounded-lg p-2"
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
