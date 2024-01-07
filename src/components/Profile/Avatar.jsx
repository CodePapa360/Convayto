import { HiOutlineUserCircle } from "react-icons/hi2";
import { useUser } from "../../features/authentication/useUser";

function Avatar() {
  const { user, updateUser } = useUser();
  const {
    user_metadata: { avatar_url },
  } = user;

  return (
    <div className="border-textViolet dark:border-textViolet-dark mx-auto mt-4 h-52 w-52 overflow-hidden rounded-full border-2">
      {avatar_url ? (
        <img
          className="h-full w-full object-cover object-center"
          src="/images/test-image.jpg"
          alt="avatar"
        />
      ) : (
        <HiOutlineUserCircle
          style={{ height: "100%", opacity: "0.5", width: "100%" }}
          strokeWidth="1"
        />
      )}
    </div>
  );
}

export default Avatar;
