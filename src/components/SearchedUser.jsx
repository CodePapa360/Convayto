import { useNavigate } from "react-router-dom";
import { useUi } from "../contexts/UiContext";
import { HiOutlineUserCircle } from "react-icons/hi2";

function SearchedUser({ user }) {
  const { closeSearchView } = useUi();

  const { fullname, id, username } = user;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${id}`);
    closeSearchView();
  }

  return (
    <div
      className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 hover:bg-black/10 dark:hover:bg-lightSlate/10`}
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

        <span className="truncate text-sm opacity-70">{username}</span>
      </span>
    </div>
  );
}

export default SearchedUser;
