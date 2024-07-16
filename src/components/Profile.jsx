import { HiOutlineUserCircle } from "react-icons/hi2";
import { useEnterKeyPress } from "../utils/useEnterKeyPress";

function Profile({ onClick, userData }) {
  const fullname = userData?.fullname;
  const username = userData?.username;
  const avatar_url = userData?.avatar_url;

  const handleKeyDown = useEnterKeyPress(onClick);

  if (!userData) return <span>⚠️</span>;

  return (
    <div
      className="mr-auto grid cursor-pointer grid-cols-[2.5rem_1fr] gap-4 truncate rounded-lg border border-LightShade/20 bg-LightShade/5 p-2 hover:bg-LightShade/20"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="h-11 w-11 overflow-hidden rounded-full">
        {avatar_url ? (
          <img
            src={avatar_url}
            alt={fullname}
            className="pointer-events-none h-full w-full object-cover"
          />
        ) : (
          <HiOutlineUserCircle size={45} opacity={0.5} strokeWidth="1" />
        )}
      </div>

      <div className="truncate text-left">
        <p className="truncate">{fullname}</p>
        <p className="truncate text-sm opacity-70">@{username}</p>
      </div>
    </div>
  );
}

export default Profile;
