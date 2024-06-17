import Name from "./Name";
import Username from "./Username";
import Bio from "./Bio";
import { useUi } from "../../contexts/UiContext";
import Avatar from "./Avatar";
import RecoverPasswordBtn from "./RecoverPasswordBtn";
import { useUser } from "../../features/authentication/useUser";
import IconButton from "../../components/IconButton";
import InfoField from "./InfoField";
import { MAX_NAME_LENGTH } from "../../config";

function MyAccount() {
  const { user } = useUser();
  //   const {
  //     user_metadata: { fullname },
  //   } = user;
  const { email } = user;
  const { fullname } = user.user_metadata;

  const { closeAccountView } = useUi();

  return (
    <div className="fadeIn grid h-screen-safe grid-rows-[auto_1fr] ">
      <div className="flex h-16 items-center justify-start gap-4 p-2 dark:bg-slate-700">
        <IconButton onClick={closeAccountView}>
          <IconButton.Back />
        </IconButton>
        <p className="select-none font-bold tracking-wider">Profile</p>
      </div>

      <div className="h-full overflow-scroll p-4">
        <Avatar />

        {/* <Name /> */}
        <InfoField
          label="Name"
          oldValue={fullname}
          minLength={1}
          maxLength={MAX_NAME_LENGTH}
        />

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
