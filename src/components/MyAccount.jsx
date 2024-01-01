import { RiArrowLeftLine } from "react-icons/ri";
import { useUser } from "../features/authentication/useUser";

function Settings({ onSetMyAccountView }) {
  const { user } = useUser();
  const { fullname, username, bio } = user.user_metadata;
  const { email } = user;

  return (
    <div className="overflow-hidden">
      <div className="flex h-16 items-center justify-start gap-4 bg-slate-700 p-2">
        <button
          className="rounded-full p-3 text-xl hover:bg-slate-600"
          onClick={() => onSetMyAccountView(false)}
        >
          <RiArrowLeftLine />
        </button>
        <p className="select-none font-bold tracking-wider">Profile</p>
      </div>

      <div className="overflow-scroll p-4">
        <div className="mt-4 flex items-center justify-center overflow-hidden">
          <img
            className=" h-full max-h-40 w-full max-w-40 rounded-full border-2 border-violet-500"
            src="/images/default-avatar.svg"
            alt="avatar"
          />
        </div>

        <div className="mt-4">
          <p className=" select-none text-sm font-bold tracking-wider opacity-80">
            Name
          </p>
          <p className="mt-3">{fullname}</p>
        </div>

        <div className="mt-8">
          <p className="select-none text-sm font-bold tracking-wider opacity-80">
            Username
          </p>
          <p className="mt-3">@{username}</p>
        </div>

        <div className="mt-8">
          <p className="select-none text-sm font-bold tracking-wider opacity-80">
            Bio
          </p>
          <p className="mt-3">{bio}</p>
        </div>

        <div className="mt-8">
          <p className="select-none text-sm font-bold tracking-wider opacity-80">
            Email
          </p>
          <p className="mt-3">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
