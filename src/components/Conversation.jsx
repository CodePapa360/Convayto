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
        isActiveUser ? "bg-violet-600 hover:bg-violet-800" : ""
      } flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 hover:bg-slate-700/50 `}
      onClick={handleClick}
    >
      <span className="max-w-12 overflow-hidden rounded-full">
        <img draggable="false" src="/images/default-avatar.png" alt="User" />
      </span>

      <span className="flex flex-col overflow-hidden ">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {fullname}
        </span>

        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm opacity-70">
          {messageContent}
        </span>
      </span>
    </div>
  );
}

export default Conversation;
