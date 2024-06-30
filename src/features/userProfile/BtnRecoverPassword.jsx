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
      className="mt-8 flex h-10 items-center gap-2 rounded-md bg-textViolet px-4 text-lightSlate hover:bg-textViolet/50 disabled:bg-gray-500/30 disabled:opacity-70"
    >
      {isPending && (
        <>
          <Loader />
          Sending...
        </>
      )}

      {isSuccess && <span>Recovery email sent</span>}

      {!isPending && !isSuccess && <span>Recover password</span>}
    </button>
  );
}

export default BtnRecoverPassword;
