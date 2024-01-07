import { RiArrowLeftLine } from "react-icons/ri";
import Name from "./Name";
import Username from "./Username";
import Bio from "./Bio";
import { useUi } from "../../contexts/UiContext";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Avatar from "./Avatar";

function MyAccount() {
  const { closeAccountView } = useUi();

  function handleGoBack() {
    closeAccountView();
  }

  return (
    <div className="fadeIn overflow-hidden">
      <div className="flex h-16 items-center justify-start gap-4 p-2 dark:bg-slate-700">
        <button
          className="rounded-full p-3 text-xl hover:bg-black/10 dark:hover:bg-lightSlate/10"
          onClick={handleGoBack}
        >
          <RiArrowLeftLine />
        </button>
        <p className="select-none font-bold tracking-wider">Profile</p>
      </div>

      <div className="overflow-scroll p-4">
        <Avatar />

        <Name />

        <Username />

        <Bio />

        <div className="mt-4">
          <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
            Email
          </p>
          <p className="mt-3">test email</p>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
