import { useEffect, useRef, useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { updateProfile } from "../../services/apiProfileUpdate";

function Bio() {
  const { user, invalidateUser } = useUser();
  const {
    user_metadata: { bio },
  } = user;

  const [newBio, setNewBio] = useState(bio || "");
  const [isEditing, setIsEditing] = useState(false);

  // Highest length of a name is 25 characters
  const MAX_BIO_LENGTH = 140;

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

    const trimmedUserName = newBio.trim();

    if (trimmedUserName === "")
      return console.log("The field cannot be empty.");
    if (trimmedUserName === bio) return setIsEditing(false);

    if (isEditing) {
      updateProfile({ data: { bio: trimmedUserName } });
      invalidateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-4">
      <p className="select-none text-sm font-bold tracking-wider text-textViolet  opacity-80 dark:text-textViolet-dark">
        Bio
      </p>
      <div className=" flex h-auto items-start justify-between gap-2">
        {isEditing ? (
          <>
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
              // onBlur={handleUpdate}
              className="h-10 w-full rounded-md border-b-2 border-textViolet bg-lightSlate px-2 text-base text-deepSlate-dark outline-none dark:border-textViolet-dark dark:bg-lightSlate-dark dark:text-lightSlate"
            />

            <span className="w-8 select-none text-sm opacity-60 ">
              {MAX_BIO_LENGTH - newBio.length}
            </span>
          </>
        ) : (
          <p className="break-all px-2 text-base">{newBio}</p>
        )}

        <button
          onClick={handleUpdate}
          // disabled={newBio.trim() === ""}
          className="rounded-full p-3 text-xl text-textViolet 
          hover:bg-black/10   dark:text-textViolet-dark dark:hover:bg-lightSlate/10"
        >
          {isEditing ? <RiCheckFill /> : <RiEdit2Line />}
        </button>
      </div>
    </div>
  );
}

export default Bio;
