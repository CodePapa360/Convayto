import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { useUser } from "../../features/authentication/useUser";
import { useUpdateUser } from "../../features/hooks/useUpdateUser";
import Loader from "../Loader";

function Avatar() {
  const { user } = useUser();
  const {
    user_metadata: { avatar_url },
  } = user;

  const { updateUser, isUpdating } = useUpdateUser();

  function handleUpdateUser(file) {
    updateUser({ avatar: file, previousAvatar: avatar_url });
  }

  return (
    <div className="relative mx-auto mt-4 h-52 w-52  rounded-full border-2 border-textViolet dark:border-textViolet-dark">
      {avatar_url ? (
        <img
          className="h-full w-full rounded-full object-cover object-center"
          src={avatar_url}
          alt="avatar"
        />
      ) : (
        <HiOutlineUserCircle
          style={{ height: "100%", opacity: "0.5", width: "100%" }}
          strokeWidth="1"
        />
      )}
      <span>
        <label
          className="absolute bottom-0 right-0 m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-textViolet p-1 text-xl text-white shadow-lg dark:bg-textViolet-dark"
          htmlFor="uploadPhoto"
        >
          {isUpdating ? <Loader /> : <LuImagePlus />}
        </label>
        <input
          onChange={(e) => handleUpdateUser(e.target.files[0])}
          disabled={isUpdating}
          className="hidden"
          accept="image/*"
          type="file"
          name="photo"
          id="uploadPhoto"
        />
      </span>
    </div>
  );
}

export default Avatar;
