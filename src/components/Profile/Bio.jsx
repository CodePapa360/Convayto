import { useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import { updateProfile } from "../../services/apiProfileUpdate";

function Bio() {
  const { user, updateUser } = useUser();
  const {
    user_metadata: { bio },
  } = user;

  const [newBio, setNewBio] = useState(bio);
  const [isEditing, setIsEditing] = useState(false);

  // Highest length of a name is 25 characters
  const MAX_BIO_LENGTH = 140;

  function handleUpdate() {
    if (!isEditing) return setIsEditing(true);

    const trimmedUserName = newBio.trim();

    if (trimmedUserName === "")
      return console.log("The field cannot be empty.");
    if (trimmedUserName === bio) return setIsEditing(false);

    if (isEditing) {
      updateProfile({ data: { bio: trimmedUserName } });
      updateUser();
      setIsEditing(false);
      return;
    }
  }

  return (
    <div className="mt-4">
      <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
        Bio
      </p>
      <div className=" flex min-h-10 items-start justify-between gap-2">
        {isEditing ? (
          <>
            <textarea
              cols="30"
              rows="4"
              value={newBio}
              onChange={(e) => {
                e.target.value.length <= MAX_BIO_LENGTH &&
                  setNewBio(e.target.value);
              }}
              onBlur={handleUpdate}
              className="h-full w-full rounded-md border-b-2 border-violet-500 bg-slate-700 px-2 text-base text-slate-100 outline-none"
            ></textarea>

            <span className="w-8 select-none opacity-60">
              {MAX_BIO_LENGTH - newBio.length}
            </span>
          </>
        ) : (
          <p className="break-all px-2 text-base">{newBio}</p>
        )}

        <button
          onClick={handleUpdate}
          disabled={newBio.trim() === ""}
          className="rounded-full p-3 text-xl text-violet-500 hover:bg-slate-500/30 disabled:pointer-events-none disabled:text-slate-500"
        >
          {isEditing ? <RiCheckFill /> : <RiEdit2Line />}
        </button>
      </div>
    </div>
  );
}

export default Bio;
