import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useEnterKeyPress } from "../utils/useEnterKeyPress";

function UserItem({
  id,
  name,
  avatar,
  subtext,
  handler,
  shouldReplace = false,
}) {
  const { userId: currentFriendId } = useParams();
  const isActiveUser = currentFriendId === id;

  const navigate = useNavigate();

  function handleClick() {
    handler();
    navigate(`/m/${id}`, { replace: shouldReplace });
  }

  const handleKeyDown = useEnterKeyPress(handleClick);

  return (
    <div
      className={`${
        isActiveUser
          ? "pointer-events-none bg-gradient-to-r text-textPrimary-dark sm:from-bgAccentDim sm:to-bgAccent dark:sm:from-bgAccentDim-dark dark:sm:to-bgAccent-dark"
          : "hover:bg-LightShade/20"
      } flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <span className="h-12 w-12  flex-shrink-0 overflow-hidden rounded-full">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="pointer-events-none h-full w-full object-cover"
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
        <span className="truncate font-bold">{name}</span>

        <span className="truncate text-sm opacity-70">{subtext}</span>
      </span>
    </div>
  );
}

export default UserItem;
