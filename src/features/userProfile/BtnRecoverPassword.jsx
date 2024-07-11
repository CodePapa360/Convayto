import { useUser } from "../authentication/useUser";
import Loader from "../../components/Loader";
import useResetPasswordForEmail from "../authentication/useResetPasswordForEmail";

function BtnRecoverPassword() {
  const {
    user: { email },
  } = useUser();

  const { resetPassword, isPending, isSuccess } = useResetPasswordForEmail();

  function handleRequest() {
    resetPassword(email);
  }

  return (
    <button
      disabled={isPending || isSuccess}
      onClick={handleRequest}
      className="mt-8 flex h-10 items-center gap-2 rounded-md bg-bgAccent px-4 text-textPrimary-dark hover:bg-bgAccentDim disabled:bg-LightShade/50 disabled:text-textPrimary disabled:opacity-70 dark:bg-bgAccent-dark dark:hover:bg-bgAccentDim-dark disabled:dark:text-textPrimary-dark"
    >
      {isPending && (
        <>
          <Loader />
          Sending...
        </>
      )}

      {isSuccess && <span>Recovery email sent!</span>}

      {!isPending && !isSuccess && <span>Recover password</span>}
    </button>
  );
}

export default BtnRecoverPassword;
