import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import Loader from "../../components/Loader";
import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "../authentication/useUser";

function InfoField({ minLength, maxLength, label, oldValue }) {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, invalidateUser } = useUser();
  //   const {
  //     user_metadata: { fullname },
  //   } = user;

  const [newValue, setNewValue] = useState(oldValue || "");
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleUpdate() {
    if (!isEditing) return setIsEditing(true);

    const trimmedName = newValue.trim();
    if (trimmedName === "") return console.log("The field cannot be empty.");
    if (trimmedName === oldValue)
      return setIsEditing(false), console.log("No changes made.");

    if (isEditing) {
      updateUser({ oldValue: trimmedName });
      invalidateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <label
          htmlFor="name"
          className="select-none text-sm font-bold tracking-wider text-textViolet  opacity-80 dark:text-textViolet-dark"
        >
          {label}
        </label>

        <button
          onClick={handleUpdate}
          className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-textViolet 
            hover:bg-black/10 dark:text-textViolet-dark dark:hover:bg-lightSlate/10"
        >
          {isUpdating ? (
            <Loader />
          ) : isEditing ? (
            <RiCheckFill aria-label="Update" />
          ) : (
            <RiEdit2Line aria-label="Edit" />
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="flex justify-between">
          <input
            id="name"
            type="text"
            ref={inputRef}
            value={newValue}
            onChange={(e) => {
              e.target.value.length <= maxLength && setNewValue(e.target.value);
            }}
            className="h-10 w-full rounded-md border-b-2 border-textViolet bg-lightSlate px-2 text-base text-deepSlate-dark outline-none dark:border-textViolet-dark dark:bg-lightSlate-dark dark:text-lightSlate"
          />
          <span className="mt-3 flex w-11 select-none items-start justify-center text-xs opacity-60">
            {maxLength - newValue.length}
          </span>
        </div>
      ) : (
        <p className="self-center truncate px-2 text-base">
          {label === "Username" ? "@" : ""}
          {newValue}
        </p>
      )}
    </div>
  );
}

export default InfoField;
