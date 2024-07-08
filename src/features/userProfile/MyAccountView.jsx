import { useUi } from "../../contexts/UiContext";
import Avatar from "./Avatar";
import BtnRecoverPassword from "./BtnRecoverPassword";
import { useUser } from "../authentication/useUser";
import IconButton from "../../components/IconButton";
import InfoField from "./InfoField";
import {
  MAX_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MAX_BIO_LENGTH,
  NAME_REGEX,
  USERNAME_REGEX,
} from "../../config";
import useCheckUsernameAvailability from "../authentication/useCheckUsernameAvailability";

function MyAccountView() {
  const { isBusy, isChecking, isTaken, checkUsername, reset } =
    useCheckUsernameAvailability();
  const {
    user: {
      email,
      user_metadata: { fullname, username, bio, avatar_url },
    },
  } = useUser();

  const { closeAccountView } = useUi();

  return (
    <div className="fadeIn grid h-screen-safe grid-rows-[auto_1fr] bg-bgPrimary dark:bg-bgPrimary-dark">
      <div className="flex h-16 items-center justify-start gap-4 bg-LightShade/10 p-2">
        <IconButton onClick={closeAccountView}>
          <IconButton.Back />
        </IconButton>
        <p className="select-none font-bold tracking-wider">Profile</p>
      </div>

      <div tabIndex={-1} className="h-full overflow-scroll p-10">
        <Avatar avatar={avatar_url} />

        <InfoField
          label="Name"
          oldValue={fullname}
          updateKey="fullname"
          maxLength={MAX_NAME_LENGTH}
          regex={NAME_REGEX}
          patternMessage="Only letters, numbers, and single spaces are allowed."
        />

        <InfoField
          label="Username"
          oldValue={username}
          updateKey="username"
          minLength={MIN_USERNAME_LENGTH}
          maxLength={MAX_USERNAME_LENGTH}
          regex={USERNAME_REGEX}
          patternMessage="Only lowercase letters, numbers, underscores, and dashes are allowed."
          checkUsername={checkUsername}
          isChecking={isChecking}
          isTaken={isTaken}
          isBusy={isBusy}
          reset={reset}
        />

        <InfoField
          label="Bio"
          oldValue={bio}
          updateKey="bio"
          maxLength={MAX_BIO_LENGTH}
        />

        <InfoField label="Email" oldValue={email} />

        <BtnRecoverPassword />
      </div>
    </div>
  );
}

export default MyAccountView;
