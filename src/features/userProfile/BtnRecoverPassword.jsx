import { useUser } from "../authentication/useUser";
import Loader from "../../components/Loader";
import useRecoveryPassword from "./useRecoveryPassword";

function BtnRecoverPassword() {
  const {
    user: { email },
  } = useUser();

  const { sendRecoveryEmail, isSending, error, canSendAgain } =
    useRecoveryPassword();

  function handleRequest() {
    if (canSendAgain) {
      sendRecoveryEmail(email);
    }
  }

  return (
    <button
      disabled={isSending || !canSendAgain}
      onClick={handleRequest}
      className="mt-8 flex h-10 items-center gap-2 rounded-md bg-textViolet px-4 text-lightSlate hover:bg-textViolet/50 disabled:bg-gray-500/30 disabled:opacity-70"
    >
      {isSending && (
        <>
          <Loader />
          Sending...
        </>
      )}

      {!canSendAgain && <span>Recovery email sent</span>}

      {!isSending && canSendAgain && <span>Recover password</span>}
    </button>
  );
}

export default BtnRecoverPassword;
