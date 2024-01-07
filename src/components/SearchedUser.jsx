import { useNavigate } from "react-router-dom";
import { useUi } from "../contexts/UiContext";

function SearchedUser({ user }) {
  const { toggleSearchView } = useUi();

  const { fullname, id, username } = user;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${id}`);
    toggleSearchView();
  }

  return (
    <div
      className={` hover:bg-lightSlate/50 flex cursor-pointer select-none items-center gap-2 rounded-lg p-2`}
      onClick={handleClick}
    >
      <span className="w-full max-w-12 overflow-hidden rounded-full">
        <img draggable="false" src="/images/default-avatar.svg" alt="User" />
      </span>

      <span className="flex flex-col overflow-hidden ">
        <span className="truncate font-bold">{fullname}</span>

        <span className="truncate text-sm opacity-70">{username}</span>
      </span>
    </div>
  );
}

export default SearchedUser;
