import { useEffect, useRef, useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { updateProfile } from "../../services/apiProfileUpdate";

function Name() {
  const { user, invalidateUser } = useUser();
  const {
    user_metadata: { fullname },
  } = user;

  const [newName, setNewName] = useState(fullname || "");
  const [isEditing, setIsEditing] = useState(false);

  // Highest length of a name is 25 characters
  const MAX_NAME_LENGTH = 25;
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
      updateProfile({ data: { fullname: trimmedName } });
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
      <div className=" flex h-10 items-center justify-between gap-2">
        {isEditing ? (
          <>
            <input
              type="text"
              ref={inputRef}
              value={newName}
              onChange={(e) => {
                e.target.value.length <= MAX_NAME_LENGTH &&
                  setNewName(e.target.value);
              }}
              // onBlur={handleUpdate}
              className="h-full w-full rounded-md border-b-2 border-textViolet bg-lightSlate px-2 text-base text-deepSlate-dark outline-none dark:border-textViolet-dark dark:bg-lightSlate-dark dark:text-lightSlate"
            />
            <span className="w-8 select-none text-sm opacity-60">
              {MAX_NAME_LENGTH - newName.length}
            </span>
          </>
        ) : (
          <p className="truncate px-2 text-base">{newName}</p>
        )}

        <button
          onClick={handleUpdate}
          disabled={newName === ""}
          className="rounded-full p-3 text-xl text-textViolet 
          hover:bg-black/10   dark:text-textViolet-dark dark:hover:bg-lightSlate/10"
        >
          {isEditing ? <RiCheckFill /> : <RiEdit2Line />}
        </button>
      </div>
    </div>
  );
}

export default Name;
