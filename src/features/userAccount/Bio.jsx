import { useEffect, useRef, useState } from "react";
import { useUser } from "../authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { useUpdateUser } from "./useUpdateUser";
import Loader from "../../components/Loader";
import { MAX_BIO_LENGTH } from "../../config";

function Bio() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, invalidateUser } = useUser();
  const {
    user_metadata: { bio },
  } = user;

  const [newBio, setNewBio] = useState(bio || "");
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 2 + "px";
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }, [isEditing]);

  function handleUpdate() {
    if (!isEditing) return setIsEditing(true);

    const trimedBio = newBio.trim();
    if (trimedBio === "") return console.log("The field cannot be empty.");
    if (trimedBio === bio) return setIsEditing(false);

    if (isEditing) {
      updateUser({ bio: trimedBio });
      invalidateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="select-none text-sm font-bold tracking-wider text-textViolet  opacity-80 dark:text-textViolet-dark">
          Bio
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
          <textarea
            value={newBio}
            ref={textareaRef}
            onChange={(e) => {
              e.target.value.length <= MAX_BIO_LENGTH &&
                setNewBio(e.target.value);
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + 2 + "px";
            }}
            className="h-10 w-full rounded-md border-b-2 border-textViolet bg-lightSlate px-2 text-deepSlate-dark outline-none dark:border-textViolet-dark dark:bg-lightSlate-dark dark:text-lightSlate"
          />

          <span className="mt-3 flex w-11 select-none items-start justify-center text-xs opacity-60">
            {MAX_BIO_LENGTH - newBio.length}
          </span>
        </div>
      ) : (
        <p className="self-center break-all px-2">{newBio}</p>
      )}
    </div>
  );
}

export default Bio;
