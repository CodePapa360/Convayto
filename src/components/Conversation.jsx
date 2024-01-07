import { useNavigate, useParams } from "react-router-dom";
import { useUi } from "../contexts/UiContext";
import { HiOutlineUserCircle } from "react-icons/hi2";

function Conversation({ conversation }) {
  const { friend, messages } = conversation;
  const { fullname, id } = friend;
  const messageContent = messages?.content;
  const { userId: currentFriendConvId } = useParams();
  const isActiveUser = currentFriendConvId === id;

  const navigate = useNavigate();
  const { closeSidebar } = useUi();

  function handleClick() {
    navigate(`/${id}`);
    closeSidebar();
  }

  return (
    <div
      className={`${
        isActiveUser
          ? "text-lightSlate sm:bg-violet-600 sm:hover:bg-violet-800"
          : ""
      } flex cursor-pointer  select-none items-center gap-2 rounded-lg p-2 hover:bg-black/10 dark:hover:bg-lightSlate/10`}
      onClick={handleClick}
    >
      <span className="w-full max-w-12 overflow-hidden rounded-full">
        <HiOutlineUserCircle
          style={{ height: "100%", opacity: "0.7", width: "100%" }}
          strokeWidth="1"
        />
      </span>

      <span className="flex flex-col overflow-hidden ">
        <span className="truncate font-bold">{fullname}</span>

        <span className="truncate text-sm opacity-70">{messageContent}</span>
      </span>
    </div>
  );
}

export default Conversation;
