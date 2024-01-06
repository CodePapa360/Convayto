import { RiCloseFill } from "react-icons/ri";
import { useUi } from "../contexts/UiContext";

function FriendProfileBar({ data }) {
  const { avatar_url, fullname, username, bio } = data?.friendDetails ?? {};
  const { closeFriendSidebar, isFriendsSidebarOpen } = useUi();

  function handleGoBack() {
    closeFriendSidebar();
  }

  return (
    <>
      <div
        onClick={handleGoBack}
        className={`${
          isFriendsSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        } absolute left-0 top-0 z-20  h-dvh w-dvw bg-black/50 transition-all duration-100 ease-in-out `}
      ></div>

      <div
        className={`${
          isFriendsSidebarOpen ? "right-0 opacity-100" : "-right-full opacity-0"
        } absolute top-0 z-30 h-dvh w-4/5 overflow-hidden bg-slate-800 transition-all duration-500 ease-[cubic-bezier(.15,.72,.08,.99)] sm:w-[21rem]`}
      >
        <div className="flex h-16 items-center justify-start gap-4 bg-slate-700 p-2">
          <button
            className="rounded-full p-3 text-xl hover:bg-slate-600"
            onClick={handleGoBack}
          >
            <RiCloseFill />
          </button>
          <p className="select-none font-bold tracking-wider">Profile</p>
        </div>

        <div className="overflow-scroll p-4">
          <div className="mt-4 flex items-center justify-center overflow-hidden">
            <img
              className=" h-full max-h-40 w-full max-w-40 rounded-full border-2 border-violet-500"
              src={avatar_url ? avatar_url : "/images/default-avatar.svg"}
              alt="avatar"
            />
          </div>

          <div className="mt-8">
            <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
              Name
            </p>
            <p className="truncate px-2 text-base">{fullname}</p>
          </div>

          <div className="mt-4">
            <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
              Name
            </p>
            <p className="truncate px-2 text-base">{username}</p>
          </div>

          <div className="mt-4">
            <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
              Name
            </p>
            <p className="truncate px-2 text-base">{bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendProfileBar;
