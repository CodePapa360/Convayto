import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { useUpdateUser } from "./useUpdateUser";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { ACCEPTED_AVATAR_FILE_TYPES } from "../../config";

function Avatar({ avatar }) {
  const avatar_url = avatar;
  const { updateUser, isUpdating } = useUpdateUser();

  function handleUpdateUser(file) {
    updateUser(
      { avatar: file, previousAvatar: avatar_url },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Updated profile picture successfully!");
        },
      },
    );
  }

  return (
    <div className="relative mx-auto mt-4 h-52 w-52  rounded-full border-2 border-bgAccent dark:border-bgAccent-dark">
      {avatar_url ? (
        <img
          className="pointer-events-none h-full w-full rounded-full object-cover object-center"
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
          className="absolute bottom-0 right-0 m-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-bgAccent p-1 text-xl text-textPrimary-dark shadow-lg hover:bg-bgAccentDim dark:bg-bgAccent-dark dark:hover:bg-bgAccentDim-dark"
          htmlFor="uploadPhoto"
          role="button"
          tabIndex={0}
        >
          {isUpdating ? <Loader /> : <LuImagePlus aria-label="upload photo" />}
        </label>
        <input
          onChange={(e) => handleUpdateUser(e.target.files[0])}
          disabled={isUpdating}
          className="hidden"
          accept={ACCEPTED_AVATAR_FILE_TYPES}
          type="file"
          name="Profile picture"
          id="uploadPhoto"
        />
      </span>
    </div>
  );
}

export default Avatar;
