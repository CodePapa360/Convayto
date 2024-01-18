import { useEffect, useRef, useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { updateProfile } from "../../services/apiProfileUpdate";

function Username() {
  const { user, invalidateUser } = useUser();
  const {
    user_metadata: { username },
  } = user;

  const [newUsername, setNewUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const usernameRegex = /^[a-z0-9_]{3,30}$/;
  const isValidUsername = usernameRegex.test(newUsername);
  const inputRef = useRef(null);

  // Highest length of a username is 25 characters
  const MAX_USERNAME_LENGTH = 30;

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleUpdate() {
    if (!isEditing) return setIsEditing(true);

    const trimmedUserName = newUsername.trim();

    if (trimmedUserName === "")
      return console.log("The field cannot be empty.");
    if (trimmedUserName === username) return setIsEditing(false);

    if (isEditing) {
      updateProfile({ data: { username: trimmedUserName } });
      invalidateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-4">
      <p className="select-none text-sm font-bold tracking-wider text-textViolet opacity-80 dark:text-textViolet-dark">
        Username
      </p>
      <div className=" flex h-10 items-center justify-between gap-2">
        {isEditing ? (
          <>
            <input
              type="text"
              ref={inputRef}
              value={newUsername}
              onChange={(e) => {
                e.target.value.length <= MAX_USERNAME_LENGTH &&
                  setNewUsername(e.target.value);
              }}
              // onBlur={handleUpdate}
              className={`${
                isValidUsername
                  ? "border-textViolet  dark:border-textViolet-dark"
                  : "border-red-500"
              } h-full w-full rounded-md border-b-2   bg-lightSlate px-2  text-base text-deepSlate-dark outline-none   dark:bg-lightSlate-dark dark:text-lightSlate`}
            />
            <span className="w-8 select-none text-sm opacity-60 ">
              {MAX_USERNAME_LENGTH - newUsername.length}
            </span>
          </>
        ) : (
          <p className="truncate px-2 text-base">@{newUsername}</p>
        )}

        <button
          onClick={handleUpdate}
          disabled={newUsername === ""}
          className="rounded-full p-3 text-xl text-textViolet 
          hover:bg-black/10   dark:text-textViolet-dark dark:hover:bg-lightSlate/10"
        >
          {isEditing ? <RiCheckFill /> : <RiEdit2Line />}
        </button>
      </div>
    </div>
  );
}

export default Username;
