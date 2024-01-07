import { useNavigate, useParams } from "react-router-dom";
import { useUi } from "../contexts/UiContext";

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
        isActiveUser ? "sm:bg-violet-600 sm:hover:bg-violet-800" : ""
      } hover:bg-lightSlate/50 flex cursor-pointer select-none items-center gap-2 rounded-lg p-2`}
      onClick={handleClick}
    >
      <span className="w-full max-w-12 overflow-hidden rounded-full">
        <img draggable="false" src="/images/default-avatar.svg" alt="User" />
      </span>

      <span className="flex flex-col overflow-hidden ">
        <span className="truncate font-bold">{fullname}</span>

        <span className="truncate text-sm opacity-70">{messageContent}</span>
      </span>
    </div>
  );
}

export default Conversation;
