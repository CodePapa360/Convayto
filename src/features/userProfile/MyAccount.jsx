import { RiArrowLeftLine } from "react-icons/ri";
import Name from "./Name";
import Username from "./Username";
import Bio from "./Bio";
import { useUi } from "../../contexts/UiContext";
import Avatar from "./Avatar";
import RecoverPasswordBtn from "./RecoverPasswordBtn";
import { useUser } from "../../features/authentication/useUser";

function MyAccount() {
  const {
    user: { email },
  } = useUser();

  const { closeAccountView } = useUi();

  return (
    <div className="fadeIn grid h-dvh grid-rows-[auto_1fr] ">
      <div className="flex h-16 items-center justify-start gap-4 p-2 dark:bg-slate-700">
        <button
          className="rounded-full p-3 text-xl hover:bg-black/10 dark:hover:bg-lightSlate/10"
          onClick={() => closeAccountView()}
        >
          <RiArrowLeftLine />
        </button>
        <p className="select-none font-bold tracking-wider">Profile</p>
      </div>

      <div className="h-full overflow-scroll p-4">
        <Avatar />

        <Name />

        <Username />

        <Bio />

        {/* Email */}
        <div className="mt-5">
          <p className="select-none text-sm font-bold tracking-wider text-textViolet opacity-80 dark:text-textViolet-dark">
            Email
          </p>
          <p className="mt-2 self-center truncate px-2 text-base opacity-80">
            {email}
          </p>
        </div>

        <RecoverPasswordBtn />
      </div>
    </div>
  );
}

export default MyAccount;
