import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

function UserItem({ name, avatar, subtext, handler, id }) {
  const { userId: currentFriendId } = useParams();
  const isActiveUser = currentFriendId === id;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/m/${id}`);
    handler();
  }

  return (
    <div
      className={`${
        isActiveUser
          ? "text-lightSlate dark:bg-darkViolet-dark sm:bg-darkViolet"
          : "hover:bg-black/10 dark:hover:bg-lightSlate/10"
      } flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <span className="h-12 w-12  overflow-hidden rounded-full">
        {avatar ? (
          <img
            draggable="false"
            src={avatar}
            alt={name}
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
        <span className="truncate font-bold">{name}</span>

        <span className="truncate text-sm opacity-70">{subtext}</span>
      </span>
    </div>
  );
}

export default UserItem;
