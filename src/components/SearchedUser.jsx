import { useNavigate } from "react-router-dom";

function SearchedUser({ user, onUserClick }) {
  const { fullname, id, username } = user;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${id}`);
    onUserClick(false);
  }

  return (
    <div
      className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-2 hover:bg-slate-700/50 `}
      onClick={handleClick}
    >
      <span className="max-w-12 overflow-hidden rounded-full">
        <img draggable="false" src="/images/default-avatar.svg" alt="User" />
      </span>

      <span className="flex flex-col overflow-hidden ">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {fullname}
        </span>

        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm opacity-70">
          {username}
        </span>
      </span>
    </div>
  );
}

export default SearchedUser;
