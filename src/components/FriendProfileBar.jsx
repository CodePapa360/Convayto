import { RiCloseFill } from "react-icons/ri";
import { useUi } from "../contexts/UiContext";
import { HiOutlineUserCircle } from "react-icons/hi2";

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
        } absolute top-0 z-30 h-dvh w-4/5 overflow-hidden bg-mediumSlate transition-all duration-500 ease-[cubic-bezier(.15,.72,.08,.99)] sm:w-[21rem] dark:bg-mediumSlate-dark`}
      >
        <div className="flex h-16 items-center justify-start gap-4 bg-mediumSlate p-2 dark:bg-mediumSlate-dark">
          <button
            className="rounded-full p-3 text-xl hover:bg-black/10 dark:hover:bg-lightSlate/10"
            onClick={handleGoBack}
          >
            <RiCloseFill />
          </button>
          <p className="select-none font-bold tracking-wider">Profile</p>
        </div>

        <div className="overflow-scroll p-4">
          <div className="mx-auto mt-4 h-52 w-52 overflow-hidden rounded-full border-2 border-violet-500">
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
