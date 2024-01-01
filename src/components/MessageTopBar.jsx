import { RiMenuUnfoldLine } from "react-icons/ri";
import { useMessages } from "../features/converse/useMessages";
import { useUi } from "../contexts/UiContext";
import Loader from "./Loader";

function MessageTopBar() {
  const { data, isPending } = useMessages();
  const { avatar_url, fullname, username } = data?.friendDetails ?? {};
  const { openSidebar } = useUi();

  return (
    <div className="flex h-16 items-center gap-2 rounded-b-3xl border-b border-l border-slate-700 bg-slate-800 p-2">
      <button
        onClick={() => openSidebar()}
        className="rounded-full p-3 text-xl hover:bg-slate-700 active:scale-95 md:hidden "
      >
        <RiMenuUnfoldLine />
      </button>

      {isPending ? (
        <Loader size="medium" text="Loading user" customClasses="ml-2" />
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-10">
            <img
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
  );
}

export default MessageTopBar;
