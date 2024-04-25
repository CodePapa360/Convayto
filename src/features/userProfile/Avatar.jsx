import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { useUser } from "../authentication/useUser";
import { useUpdateUser } from "./useUpdateUser";
import Loader from "../../components/Loader";

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
          draggable="false"
          className="h-full w-full rounded-full object-cover object-center"
          src={avatar_url}
          alt="avatar"
        />
      ) : (
        <HiOutlineUserCircle
          className="h-full w-full opacity-50"
          strokeWidth="1"
        />
      )}
      <span>
        <label
          className="absolute bottom-0 right-0 m-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-darkViolet p-1 text-xl text-white shadow-lg hover:bg-darkViolet-dark dark:bg-textViolet-dark"
          htmlFor="uploadPhoto"
        >
          {isUpdating ? <Loader /> : <LuImagePlus />}
        </label>
        <input
          onChange={(e) => handleUpdateUser(e.target.files[0])}
          disabled={isUpdating}
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          type="file"
          name="photo"
          id="uploadPhoto"
        />
      </span>
    </div>
  );
}

export default Avatar;
