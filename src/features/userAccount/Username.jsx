import { useEffect, useRef, useState } from "react";
import { useUser } from "../authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { useUpdateUser } from "./useUpdateUser";
import Loader from "../../components/Loader";
import { MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH } from "../../config";

function Username() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, invalidateUser } = useUser();
  const {
    user_metadata: { username },
  } = user;

  const [newUsername, setNewUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const usernameRegex = new RegExp(
    `^[a-z0-9_]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}$`,
  );
  const isValidUsername = usernameRegex.test(newUsername);
  const inputRef = useRef(null);

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
      updateUser({ username: trimmedUserName });
      invalidateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="select-none text-sm font-bold tracking-wider text-textViolet opacity-80 dark:text-textViolet-dark">
          Username
        </p>

        <button
          onClick={handleUpdate}
          className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-textViolet 
          hover:bg-black/10 dark:text-textViolet-dark dark:hover:bg-lightSlate/10"
        >
          {isUpdating ? (
            <Loader />
          ) : isEditing ? (
            <RiCheckFill />
          ) : (
            <RiEdit2Line />
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="flex justify-between">
          <input
            type="text"
            ref={inputRef}
            value={newUsername}
            onChange={(e) => {
              e.target.value.length <= MAX_USERNAME_LENGTH &&
                setNewUsername(e.target.value);
            }}
            className={`${
              isValidUsername
                ? "border-textViolet  dark:border-textViolet-dark"
                : "border-red-500"
            } h-10 w-full rounded-md border-b-2   bg-lightSlate px-2  text-base text-deepSlate-dark outline-none   dark:bg-lightSlate-dark dark:text-lightSlate`}
          />
          <span className="mt-3 flex w-11 select-none items-start justify-center text-xs opacity-60">
            {MAX_USERNAME_LENGTH - newUsername.length}
          </span>
        </div>
      ) : (
        <p className="self-center truncate px-2 text-base">@{newUsername}</p>
      )}
    </div>
  );
}

export default Username;
