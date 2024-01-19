import { useEffect, useRef, useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { useUpdateUser } from "../../features/hooks/useUpdateUser";
import Loader from "../Loader";
import { MAX_NAME_LENGTH } from "../../config";

function Name() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, invalidateUser } = useUser();
  const {
    user_metadata: { fullname },
  } = user;

  const [newName, setNewName] = useState(fullname || "");
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleUpdate() {
    if (!isEditing) return setIsEditing(true);

    const trimmedName = newName.trim();
    if (trimmedName === "") return console.log("The field cannot be empty.");
    if (trimmedName === fullname) return setIsEditing(false);

    if (isEditing) {
      updateUser({ fullname: trimmedName });
      invalidateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-8">
      <p className="select-none text-sm font-bold tracking-wider text-textViolet  opacity-80 dark:text-textViolet-dark">
        Name
      </p>
      <div className="grid h-auto grid-cols-[1fr_auto] items-start justify-between">
        {isEditing ? (
          <div className="grid grid-cols-[1fr_auto]">
            <input
              type="text"
              ref={inputRef}
              value={newName}
              onChange={(e) => {
                e.target.value.length <= MAX_NAME_LENGTH &&
                  setNewName(e.target.value);
              }}
              // onBlur={handleUpdate}
              className="h-11 w-full rounded-md border-b-2 border-textViolet bg-lightSlate px-2 text-base text-deepSlate-dark outline-none dark:border-textViolet-dark dark:bg-lightSlate-dark dark:text-lightSlate"
            />
            <span className="flex w-8 select-none items-start justify-center text-xs opacity-60">
              {MAX_NAME_LENGTH - newName.length}
            </span>
          </div>
        ) : (
          <p className="truncate px-2 text-base">{newName}</p>
        )}

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
    </div>
  );
}

export default Name;
