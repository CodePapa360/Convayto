import { useNavigate, useParams } from "react-router-dom";
import { useUi } from "../contexts/UiContext";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useAppData } from "../contexts/AppDataContext";

function Conversation({ conversation }) {
  const { setCurrentConvUser } = useAppData();
  const { friend, messages: lastMessage } = conversation;
  const { fullname, id, avatar_url } = friend;
  const lastMessageContent = lastMessage?.content;
  const { userId: currentFriendId } = useParams();
  const isActiveUser = currentFriendId === id;

  const navigate = useNavigate();
  const { closeSidebar } = useUi();

  function handleClick() {
    navigate(`/${id}`);
    closeSidebar();
    setCurrentConvUser(friend);
  }

  return (
    <div
      className={`${
        isActiveUser
          ? "text-lightSlate dark:bg-darkViolet-dark sm:bg-darkViolet"
          : "hover:bg-black/10 dark:hover:bg-lightSlate/10"
      } flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 `}
      onClick={handleClick}
    >
      <span className="h-12 w-12  overflow-hidden rounded-full">
        {avatar_url ? (
          <img
            draggable="false"
            src={avatar_url}
            alt={fullname}
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

      <span className="flex flex-col overflow-hidden ">
        <span className="truncate font-bold">{fullname}</span>

        <span className="truncate text-sm opacity-70">
          {lastMessageContent}
        </span>
      </span>
    </div>
  );
}

export default Conversation;
