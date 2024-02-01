import { useNavigate } from "react-router-dom";
import { useUi } from "../contexts/UiContext";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useAppData } from "../contexts/AppDataContext";

function SearchedUser({ user }) {
  const { closeSearchView } = useUi();
  const { setCurrentConvUser } = useAppData();

  const { fullname, id, username, avatar_url } = user;
  const navigate = useNavigate();

  function handleClick() {
    closeSearchView({ back: false });
    navigate(`/${id}`, { replace: true });
    setCurrentConvUser(user);
  }

  return (
    <div
      className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 hover:bg-black/10 dark:hover:bg-lightSlate/10`}
      onClick={handleClick}
    >
      <span className="h-12 w-12 overflow-hidden rounded-full">
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

        <span className="truncate text-sm opacity-70">{username}</span>
      </span>
    </div>
  );
}

export default SearchedUser;
