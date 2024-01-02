import { useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { updateProfile } from "../../services/apiProfileUpdate";

function Username() {
  const { user, updateUser } = useUser();
  const {
    user_metadata: { username },
  } = user;

  const [newUsername, setNewUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  const isValidUsername = usernameRegex.test(newUsername);

  // Highest length of a username is 25 characters
  const MAX_USERNAME_LENGTH = 30;

  function handleUpdate() {
    if (!isEditing) return setIsEditing(true);

    const trimmedUserName = newUsername.trim();

    if (trimmedUserName === "")
      return console.log("The field cannot be empty.");
    if (trimmedUserName === username) return setIsEditing(false);

    if (isEditing) {
      updateProfile({ data: { username: trimmedUserName } });
      updateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-4">
      <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
        Username
      </p>
      <div className=" flex h-10 items-center justify-between gap-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => {
                e.target.value.length <= MAX_USERNAME_LENGTH &&
                  setNewUsername(e.target.value);
              }}
              onBlur={handleUpdate}
              className={`${
                isValidUsername ? "border-violet-500" : "border-red-500"
              } h-full w-full rounded-md border-b-2  bg-slate-700 px-2 text-base text-slate-100 outline-none`}
            />
            <span className="w-8 select-none opacity-60">
              {MAX_USERNAME_LENGTH - newUsername.length}
            </span>
          </>
        ) : (
          <p className="truncate px-2 text-base">@{newUsername}</p>
        )}

        <button
          onClick={handleUpdate}
          disabled={newUsername === "" || !isValidUsername}
          className="rounded-full p-3 text-xl text-violet-500 hover:bg-slate-500/30 disabled:pointer-events-none disabled:text-slate-500"
        >
          {isEditing ? <RiCheckFill /> : <RiEdit2Line />}
        </button>
      </div>
    </div>
  );
}

export default Username;
